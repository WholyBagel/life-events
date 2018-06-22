import R from 'ramda';
// import finance from 'financejs'
// import $ from 'jquery'
import d3 from 'd3';
// import d3Axis from 'd3-axis'
import CONSTANTS from './questions/constants';

const {
  OCCUPATIONAL_DATA, EDUCATIONAL_DATA, DEFAULT_AGE, DEFAULT_COLLEGE_START_AGE, DEFAULT_RETIREMENT_AGE, DEFAULT_COLA_ADJ, TAX_INFO, DEFAULT_RATE, DEFAULT_HOURS, IDs
} = CONSTANTS;
const { QUESTION_IDS, PAGE_IDS } = IDs;
const { LIFESTYLE_PLANS_PAGE } = PAGE_IDS;
const { TAX_BRACKETS } = TAX_INFO;
const MONTHS = 12;

const createChart = () => {
  const scale = d3.scaleLinear()
    .domain([10, 130])
    .range([0, 960]);
  const axis = d3.axisLeft(scale);
  d3.select('.chart')
    .append('svg')
    .attr('width', 1000)
    .attr('height', 30)
    .append('g')
    .attr('transform', 'translate(0,30)')
    .call(axis);
};

const calculateFunds = () => {
  const age = state.ui.values.ageInput || DEFAULT_AGE;
  // const hourlyOrSalary = state.ui.value.hourlyOrSalaryRadio
  // if (hourlyOrSalary === 'Salary'){}
  // Trying to make the hours/rate changeable
  const hours = state.ui.values.hoursWeeklyInput || DEFAULT_HOURS;
  const rate = state.ui.values.hourlyRateInput || DEFAULT_RATE;

  const foodSpending = state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD] || 0;
  const hobbySpending = state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES] || 0;
  const transportationSpending = state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION] || 0;
  const deductions = (52 * (Number(foodSpending) + Number(hobbySpending) + Number(transportationSpending)));

  // Creating their weekly salary
  const weeklySalary = Math.round(hours * rate);

  const annualSalary = Math.round(weeklySalary * 52);

  console.log(`Annual ${annualSalary}`);
  const monthlySalary = Math.round(annualSalary / 12);
  console.log(`Monthly Salary  ${monthlySalary}`);

  const initialFunds = state.ui.values.networthInput || 0;
  // If hourly checked, annual income is based on hours and rate and the career is a text input, else use salary stuffs

  const currentAnnualIncome = state.ui.values.currentAnnualIncomeInput || 0;

  const moneyLeftPerYear = state.ui.values.currentAnnualIncomeInput - deductions || 0;

  const careerId = state.ui.values.careerInput || '';
  const careerData = createCareerData(careerId);
  const currentSalary = isInCareer(age, careerData.educationLevel) ? careerData.startingCareerSalary : currentAnnualIncome;
  // currentSalary -= state.ui.values.foodSpending;
  let federalTaxBracket = getFederalTaxBracket(TAX_INFO.INDV, careerData.startingCareerSalary);
  let stateTaxBracket = getStateTaxBracket(TAX_INFO.INDV, 'WI', careerData.startingCareerSalary);

  const netIncome = calcNetIncome({ federalTaxBracket, stateTaxBracket }, currentSalary);
  let monthly = R.times(calcMonthlyData(initialFunds, currentSalary, federalTaxBracket, stateTaxBracket), MONTHS);
  let money = [
    {
      age,
      currentAnnualSalary: currentSalary,
      netAnnualIncome: netIncome,
      moneyLeftPerYear,
      monthly,
      totalNetworth: initialFunds + netIncome,
      foodSpending,
      hobbySpending,
      transportationSpending
    }];

  const workingYears = R.takeLast(DEFAULT_RETIREMENT_AGE - age, R.times(R.identity, DEFAULT_RETIREMENT_AGE + 1));

  money = R.reduce((accum, currentAge) => {
    const year = currentAge - age;
    const lastYear = R.last(accum) || {};
    const inCareer = isInCareer(currentAge, careerData.educationLevel);
    // Currently still using 'year' as # years after the age entered. Not the # of years starting the career
    const currentAnnualSalary = inCareer ? calcSalaryWithCOLA(careerData.startingCareerSalary, year) : calcSalaryWithCOLA(currentAnnualIncome, year);
    federalTaxBracket = getFederalTaxBracket(TAX_INFO.INDV, currentAnnualSalary);
    stateTaxBracket = getStateTaxBracket(TAX_INFO.INDV, 'WI', currentAnnualSalary);
    const netAnnualIncome = calcNetIncome({ federalTaxBracket, stateTaxBracket }, currentAnnualSalary);
    monthly = R.times(calcMonthlyData(lastYear.totalNetworth, currentAnnualSalary, federalTaxBracket, stateTaxBracket), MONTHS);
    return [...accum, {
      age: currentAge,
      currentAnnualSalary,
      netAnnualIncome,
      monthly,
      totalNetworth: lastYear.totalNetworth + netAnnualIncome,
      foodSpending: state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD],
      hobbySpending: state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES],
      transportationSpending: state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION]
    }];
  }, money)(workingYears);

  return money;
};

export default {
  createChart,
  calculateFunds
};

const createCareerData = (careerId) => {
  const findCareer = R.find(job => job.id === careerId);
  const result = {

  };
  if (!R.isEmpty(careerId)) {
    const careerObj = findCareer(OCCUPATIONAL_DATA);
    result.startingCareerSalary = careerObj ? careerObj.salary : 0;
    result.educationLevel = R.find(edu => edu.id === careerObj.education, EDUCATIONAL_DATA);
  }

  return result;
};

const getFederalTaxBracket = (indvOrJoint, taxibleEarnings) => {
  const taxData = indvOrJoint === TAX_BRACKETS.JOINT ? TAX_BRACKETS.FEDERAL.JOINT : TAX_BRACKETS.FEDERAL.INDV;
  return R.reduce((accum, item) => {
    if (taxibleEarnings >= item.maxEarnings) { return item; }
    return accum;
  }, taxData[0])(taxData);
};

const getStateTaxBracket = (indvOrJoint, stateCode = 'WI', taxibleIncome) => {
  const taxData = indvOrJoint === TAX_BRACKETS.JOINT ? TAX_BRACKETS.STATE[stateCode].JOINT : TAX_BRACKETS.STATE[stateCode].INDV;

  return R.reduce((accum, item) => {
    if (taxibleIncome >= item.maxEarnings) { return item; }
    return accum;
  }, taxData[0])(taxData);
};

const isInCareer = (age, educationLevel) => !!educationLevel && (age >= ((educationLevel.years || 0) + DEFAULT_COLLEGE_START_AGE));

const calcNetIncome = ({ federalTaxBracket, stateTaxBracket }, taxibleIncome) =>
  taxibleIncome - (taxibleIncome * (federalTaxBracket.percent)) - (taxibleIncome * (stateTaxBracket.percent));

const calcSalaryWithCOLA = (startingSalary, currentYear) => startingSalary * (1 + (DEFAULT_COLA_ADJ / 1)) ** currentYear;

const calcMonthlyData = R.curry((lastYearNW, currentSalary, federalTaxBracket, stateTaxBracket, month) => {
  const currentMonthlySalary = currentSalary / MONTHS;
  const netIncome = calcNetIncome({ federalTaxBracket, stateTaxBracket }, currentMonthlySalary);
  return {
    month: month + 1,
    currentMonthlySalary,
    netIncome,
    totalNetworth: lastYearNW + (netIncome * (month + 1))
  };
});
