import { toast } from 'react-toastify'

const errorToast = data => {
  let error

  if (Object.prototype.hasOwnProperty.call(data.errors, 'title')) {
    error = `Title ${data.errors.title}.`
  } else {
    error = 'Something went wrong. Please try again later.'
  }

  toast.error(error, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  })
}

export default errorToast
