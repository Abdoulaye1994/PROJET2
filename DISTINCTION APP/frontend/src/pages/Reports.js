import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Download, Print } from '@mui/icons-material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import { ArticleList } from './components/ArticleList';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [reports, setReports] = useState([]);

  // Simuler les données de rapports (à remplacer par vos données réelles)
  const mockReports = [
    {
      id: 1,
      date: '2025-05-17',
      category: 'Vêtements',
      subcategory: 'Goodluck',
      total: 500,
      items: 10,
    },
    {
      id: 2,
      date: '2025-05-16',
      category: 'Accessoires',
      subcategory: 'Chaussures',
      total: 300,
      items: 5,
    },
  ];

  const filteredReports = useMemo(() => {
    let filtered = mockReports;

    if (startDate) {
      filtered = filtered.filter(report => 
        new Date(report.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(report => 
        new Date(report.date) <= new Date(endDate)
      );
    }

    if (category) {
      filtered = filtered.filter(report => 
        report.category === category
      );
    }

    if (subcategory) {
      filtered = filtered.filter(report => 
        report.subcategory === subcategory
      );
    }

    return filtered;
  }, [startDate, endDate, category, subcategory, mockReports]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Rapport des Stocks', 105, 20);
    
    // Ajouter les données du rapport
    let y = 30;
    filteredReports.forEach((report, index) => {
      doc.setFontSize(12);
      doc.text(`Rapport ${index + 1}:`, 15, y);
      doc.setFontSize(10);
      doc.text(`Date: ${report.date}`, 15, y + 10);
      doc.text(`Catégorie: ${report.category}`, 15, y + 20);
      doc.text(`Sous-catégorie: ${report.subcategory}`, 15, y + 30);
      doc.text(`Total: ${report.total}€`, 15, y + 40);
      doc.text(`Articles: ${report.items}`, 15, y + 50);
      y += 60;
    });

    doc.save('rapport-stocks.pdf');
  };

  const printReport = () => {
    window.print();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rapports des Stocks
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Date de début"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ width: '100%' }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Date de fin"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ width: '100%' }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  value={category}
                  label="Catégorie"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="">Toutes</MenuItem>
                  <MenuItem value="Vêtements">Vêtements</MenuItem>
                  <MenuItem value="Accessoires">Accessoires</MenuItem>
                  <MenuItem value="Pressing">Pressing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sous-catégorie</InputLabel>
                <Select
                  value={subcategory}
                  label="Sous-catégorie"
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <MenuItem value="">Toutes</MenuItem>
                  <MenuItem value="Goodluck">Goodluck</MenuItem>
                  <MenuItem value="Danshiki">Danshiki</MenuItem>
                  <MenuItem value="Chaussures">Chaussures</MenuItem>
                  <MenuItem value="Sacs">Sacs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={generatePDF}
              startIcon={<Download />}
            >
              Exporter en PDF
            </Button>
            <Button
              variant="outlined"
              onClick={printReport}
              startIcon={<Print />}
            >
              Imprimer
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Sous-catégorie</TableCell>
                <TableCell>Total (€)</TableCell>
                <TableCell>Articles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>{report.subcategory}</TableCell>
                  <TableCell>{report.total}</TableCell>
                  <TableCell>{report.items}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Reports;
