import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import api from 'src/service/api'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const FazendaListView = () => {
  const classes = useStyles();
  const [fazendas, setFazendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
      api.get('fazendas', {
        params: {
          size: limit,
          page
        }
      }).then(response => {
        setFazendas(response.data)
        setLoading(false)
      })
  }, [limit, page])

  const reload = useCallback((limit, offset) => {
    setLoading(true)
    setLimit(limit)
    setPage(offset)
  }, [])

  if (loading)
    return <LinearProgress  />

  return (
    <Page
      className={classes.root}
      title="Fazendas"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results data={fazendas} reload={reload} page={page} limit={limit} />
        </Box>
      </Container>
    </Page>
  );
};

export default FazendaListView;