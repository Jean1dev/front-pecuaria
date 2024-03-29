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
import api from 'src/service/api';

const useStyles = makeStyles(() => ({
  root: {}
}));

const FazendaSelect = ({
  addFazenda, fazendaSelected, className, overrideTitle, ...rest
}) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    selecionado: undefined
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    addFazenda(event.target.value);
  };

  useEffect(() => {
    if (fazendaSelected) {
      setValues({
        selecionado: fazendaSelected.toString()
      });
    }
  }, [fazendaSelected]);

  useEffect(() => {
    api.get('fazendas/listagem').then((response) => {
      setData(response.data);
    });
  }, [addFazenda]);

  useEffect(() => {
    if (!fazendaSelected) {
      addFazenda(data[0]?.id);
    }
  }, [data, addFazenda, fazendaSelected]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title={overrideTitle ? overrideTitle : "Fazenda"}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
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
                {data.map((e) => (
                  <option
                    key={e.id}
                    value={e.id}
                  >
                    {e.nome}
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

FazendaSelect.propTypes = {
  className: PropTypes.string,
  addFazenda: PropTypes.func,
  fazendaSelected: PropTypes.number
};

export default FazendaSelect;
