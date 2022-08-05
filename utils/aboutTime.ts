export const today = () => {
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
