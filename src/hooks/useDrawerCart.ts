import { useDispatch, useSelector } from 'react-redux'
import { toggleDrawerCart } from '@/store/redux/slices/appSlice'
import { RootState } from '@/store/redux/store'
function useDrawerCart() {
  const dispatch = useDispatch()
  const openDrawerCart = useSelector((state: RootState) => state.app.openDrawerCart)
  const onOpen = () => {
    dispatch(toggleDrawerCart(true))
  }
  const onClose = () => {
    dispatch(toggleDrawerCart(false))
  }
  return { onOpen, onClose, openDrawerCart }
}

export default useDrawerCart
