import React from 'react';
import {usePagination, UsePaginationProps} from '@material-ui/lab';
import {Grid, Link, Typography, Box, Button} from '@material-ui/core';

type NavItemType = 'first' | 'previous' | 'next' | 'last';

const getItemOrder = (type: NavItemType): number => {
  switch (type) {
    case 'first':
      return 1;
    case 'previous':
      return 2;
    case 'next':
      return 4;
    case 'last':
      return 5;
    default:
      return 3;
  }
};

interface PagginationProps extends UsePaginationProps {
  onPageChange: (page: number) => void;
}

const Paggination = ({count, onPageChange, page: currentPage}: PagginationProps): React.ReactElement => {
  function handlePagginationChange({}: {}, page: number): void {
    onPageChange(page);
  }

  const {items: pageNavItems} = usePagination({
    count: count,
    showFirstButton: true,
    showLastButton: true,
    onChange: handlePagginationChange,
    page: currentPage,
  });

  return (
    <Grid container justify="center" alignItems="center">
      {pageNavItems
        .filter(({type}) => ['first', 'previous', 'next', 'last'].includes(type))
        .map(({page, type, selected, ...item}, index) => (
          <Grid
            item
            style={{
              order: getItemOrder(type as NavItemType),
            }}
            key={`${index}`}>
            <Box marginX={2}>
              <Link component="button" variant="body2" color="primary" key={`${index}`} {...item}>
                {type}
              </Link>
            </Box>
          </Grid>
        ))}
      <Grid item style={{order: 3}}>
        <Box marginX={2}>
          <Typography>
            {currentPage} of {count}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Paggination;
