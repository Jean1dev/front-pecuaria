import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import useEnums from '../useEnums';

const useStyles = makeStyles(() => ({
  root: {}
}));

const TipoMetragemSelect = ({
  add, tipoMetragemSelected, className, ...rest
}) => {
  const classes = useStyles();
  const [enums, setEnums] = useState([]);
  const [values, setValues] = useState({
    selecionado: undefined
  });
  const [{ loadingEnum }, getGroupEnum] = useEnums();

  useEffect(() => {
    if (loadingEnum) {
      return;
    }
    setEnums(getGroupEnum('TipoMetragem'));
    if (tipoMetragemSelected) {
      setValues({
        ...values,
        selecionado: tipoMetragemSelected
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoMetragemSelected, loadingEnum]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    add(event.target.value);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Tipo de medida" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="selecionado"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.selecionado}
                variant="outlined"
              >
                {enums.map((_enum) => (
                  <option key={_enum.chave} value={_enum.chave}>
                    {_enum.valor}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

TipoMetragemSelect.propTypes = {
  className: PropTypes.string,
  add: PropTypes.func,
  tipoMetragemSelected: PropTypes.string
};

export default TipoMetragemSelect;
