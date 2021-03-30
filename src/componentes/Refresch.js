import Button from '@material-ui/core/Button';

function Refrescar() {

const refreshPage = ()=>{
   window.location.reload();
}

return (
  <div>
    <Button size="small" type="button" variant="contained" color="secondary" disableElevation onClick={refreshPage}>Refrescar</Button>
  </div>
);
}
export { Refrescar };