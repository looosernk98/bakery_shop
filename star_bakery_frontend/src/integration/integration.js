
const API_END_POINTS = {
  fetchEachItemOrders : (startTime, endTime) => `/orders/all_items_order_stats?from_time=${startTime}&to_time=${endTime}`,
  fetchOrderByDeliveryState: (startTime, endTime) => `/orders/get_order_by_delivery_state?from_time=${startTime}&to_time=${endTime}`,
  fetctTopBranches: (startTime, endTime) => `/orders/get_top_branches?from_time=${startTime}&to_time=${endTime}`,
  fetchOrderDataByTimePeriod: (startTime, endTime, filterType) => `/orders/get_order_data?from_time=${startTime}&to_time=${endTime}&filter_type=${filterType}`
}

export default API_END_POINTS;