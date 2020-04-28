import { toast } from 'react-toastify'

const postSuccessToast = displayMessage =>
  toast.success(displayMessage, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  })

export default postSuccessToast
