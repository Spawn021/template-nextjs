import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '@/store/redux/slices/appSlice'
import { RootState } from '@/store/redux/store'
function useModal() {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.app.open)
  const onVisible = () => {
    dispatch(openModal(true))
  }
  const onClose = () => {
    dispatch(openModal(false))
  }
  return { onVisible, onClose, open }
}

export default useModal
