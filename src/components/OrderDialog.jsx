import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import OrderDialogContent from './OrderDialogContent';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../store/firebase.services';
import { useAuthContext } from '../context/auth.context';

export default function OrderDialog({totalAmount, btnId, discount = totalAmount * 0.20, title}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentUser } = useAuthContext();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {}, [currentUser])

  const handlePlaceOrder = () => {
    try {
    const event = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
      
      const OrderPlacedDate = event.toLocaleDateString('en-IN', options);

      dispatch(placeOrder({userId : currentUser.uid, date : OrderPlacedDate}));
      setOpen(true);
    } catch (error) {
      alert('Something Went wrong.')
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" id={btnId} color='warning' onClick={handlePlaceOrder} disabled={totalAmount == 0 ? true : false }>
        Place Order
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <OrderDialogContent totalAmount={totalAmount} discount={discount}/>
      </Dialog>
    </React.Fragment>
  );
}
