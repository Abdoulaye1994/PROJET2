import React from 'react';
import { Container, Typography, Box, Grid, Paper, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function Rapports() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rapports
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Ventes" />
            <Tab label="Stocks" />
            <Tab label="Clients" />
            <Tab label="Personnel" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 4 }}>
          {selectedTab === 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Rapport des Ventes
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Montant Total</TableCell>
                      <TableCell>Nombre de Transactions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Aujourd'hui</TableCell>
                      <TableCell>150,000 FCFA</TableCell>
                      <TableCell>25</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cette semaine</TableCell>
                      <TableCell>850,000 FCFA</TableCell>
                      <TableCell>125</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ce mois</TableCell>
                      <TableCell>3,500,000 FCFA</TableCell>
                      <TableCell>450</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
}
