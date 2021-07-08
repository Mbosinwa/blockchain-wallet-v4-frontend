import * as AT from './actionTypes'

// RATES
export const fetchRates = () => ({ type: AT.FETCH_ALGO_RATES })
export const fetchRatesLoading = () => ({
  type: AT.FETCH_ALGO_RATES_LOADING
})
export const fetchRatesSuccess = (data) => ({
  payload: data,
  type: AT.FETCH_ALGO_RATES_SUCCESS
})
export const fetchRatesFailure = (error) => ({
  payload: error,
  type: AT.FETCH_ALGO_RATES_FAILURE
})

// FETCH_ALGO_TRANSACTIONS
export const fetchTransactions = (address?, reset?) => ({
  payload: { address, reset },
  type: AT.FETCH_ALGO_TRANSACTIONS
})
export const fetchTransactionsFailure = (error) => ({
  payload: error,
  type: AT.FETCH_ALGO_TRANSACTIONS_FAILURE
})
export const fetchTransactionsLoading = (reset) => ({
  payload: { reset },
  type: AT.FETCH_ALGO_TRANSACTIONS_LOADING
})
export const fetchTransactionsSuccess = (transactions, reset, isFinalPage) => ({
  payload: { isFinalPage, reset, transactions },
  type: AT.FETCH_ALGO_TRANSACTIONS_SUCCESS
})
export const transactionsAtBound = (payload) => ({
  payload,
  type: AT.ALGO_TRANSACTIONS_AT_BOUND
})
