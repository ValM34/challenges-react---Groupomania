export default function dateConverter(mySQLDate){
  let result = mySQLDate.replaceAll('-', ' ').replace('T', ' ').replaceAll(':', ' ').replace('.', ' ');
  result = result.split(' ');
  result = `${result[2]}/${result[1]}/${result[0]} ${result[3]}:${result[4]}`;
  return result;
}