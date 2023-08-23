import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { actions, selectors } from 'data'
import { SendCryptoStepType } from 'data/components/sendCrypto/types'
import { ModalName } from 'data/types'
import { useRemote } from 'hooks'
import modalEnhancer from 'providers/ModalEnhancer'

import { ModalPropsType } from '../../types'
import { getData } from './selectors'
import RecommendedImportedSweep from './template'
import NoActionRequired from './template.noaction'

const RecommendedImportSweepContainer = (props: Props) => {
  const { data, error, isLoading, isNotAsked } = useRemote(getData)
  const SEND_FORM = '@SEND_CRYPTO'

  const btcAddressHasBalance = data?.btcImports.filter((addr) => addr.info.final_balance > 0)
  const bchAddressHasBalance = data?.bchImports.filter((addr) => addr.info.final_balance > 0)

  const handleSubmit = () => {
    props.sendBtcActions.btcImportedFundsSweep(btcAddressHasBalance!.map((item) => item.addr))

    // props.sendBchActions.bchImportedFundsSweep(bchAddressHasBalance!.map((item) => item.addr))
    // props.modalActions.closeModal(ModalName.RECOMMENDED_IMPORTED_SWEEP)
  }
  if (isLoading || isNotAsked || error) return null
  if (
    props.hideNoActionRequiredSweep &&
    btcAddressHasBalance?.length === 0 &&
    bchAddressHasBalance?.length === 0
  )
    return null
  if (
    (data?.bchImports.length === 0 && data?.btcImports.length === 0) ||
    (btcAddressHasBalance?.length === 0 && bchAddressHasBalance?.length === 0)
  ) {
    return <NoActionRequired {...props} />
  }
  return (
    <RecommendedImportedSweep
      {...props}
      btcAddressHasBalance={btcAddressHasBalance}
      bchAddressHasBalance={bchAddressHasBalance}
      onSubmit={handleSubmit}
    />
  )
}

const mapStateToProps = (state) => ({
  hideNoActionRequiredSweep: selectors.cache.getNoActionRequiredSweep(state)
})

const mapDispatchToProps = (dispatch) => ({
  cacheActions: bindActionCreators(actions.cache, dispatch),
  formActions: bindActionCreators(actions.form, dispatch),
  modalActions: bindActionCreators(actions.modals, dispatch),
  sendBchActions: bindActionCreators(actions.components.sendBch, dispatch),
  sendBtcActions: bindActionCreators(actions.components.sendBtc, dispatch),
  sendCryptoActions: bindActionCreators(actions.components.sendCrypto, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

const enhance = compose(modalEnhancer(ModalName.RECOMMENDED_IMPORTED_SWEEP), connector)

export type Props = ModalPropsType & ConnectedProps<typeof connector>

export default enhance(RecommendedImportSweepContainer)
