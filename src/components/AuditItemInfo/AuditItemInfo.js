import React, { Component } from 'react';
import classNames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';



class AuditItemInfo extends Component {

  render() {
    const { items } = this.props;
    const headers = Object.keys(items[0]);
    console.log(items);
    return (
      <div className="AuditItemInfo">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {headers.map((key, i) => (
                  <TableCell key={i}>
                    <b>{key}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>

              {items.map((item, i) => {
                return (
                  <TableRow hover key={i}>
                    {Object.keys(item).map((key, i) => {
                      return (
                        <TableCell key={i}>
                          {typeof item[headers[i]] !== 'object' && item[headers[i]]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default AuditItemInfo;