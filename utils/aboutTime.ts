const getCurrentTime = () => {
  const newDate = new Date()
  const year = newDate.getFullYear() + ''
  const month = ('0' + (newDate.getMonth() + 1)).slice(-2)
  const date = ('0' + newDate.getDate()).slice(-2)
  /* 현재시간에서 1시간을 빼고 30분을 더한 시각 
    ex) 현재시간이 16:20분이면 base_time은 1530
  */
  const base_time = ('0' + (newDate.getHours() - 1)).slice(-2) + '30'
  return { base_date: year + month + date, base_time }
}
/* ex) 2300 => 오후 11시로 변환 */
const convertHour = (hour: string) => {
  if (hour === '0000') return '밤 12시'
  if (hour === '1200') return '낮 12시'
  if (hour > '1200') {
    return `오후 ${+hour?.slice(0, 2) - 12}시`
  }
  return `오전 ${hour?.slice(0, 2)}시`
}
/* ex) 타임스탬프값 => 2019-12-15로 변환 */
const timestampToDate = (ts: number) => {
  const date = new Date(ts)
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
    '0' + date.getDate()
  ).slice(-2)}`
}
export { getCurrentTime, convertHour, timestampToDate }
