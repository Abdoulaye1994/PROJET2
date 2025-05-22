import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Typography,
  Box,
} from '@mui/material';
import Papa from 'papaparse';
import DownloadIcon from '@mui/icons-material/Download';

function StocksTest() {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  const handleImportExport = () => {
    setImportDialogOpen(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setImportError('Veuillez sélectionner un fichier CSV');
      return;
    }

    setCsvFile(file);
    setImportError('');
    setImportSuccess('');
  };

  const handleImportSubmit = () => {
    if (!csvFile) {
      setImportError('Veuillez sélectionner un fichier CSV');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsedData = Papa.parse(text, {
          header: true,
          transformHeader: header => header.trim(),
          skipEmptyLines: true,
          transform: function(value) {
            if (value === '') return null;
            if (!isNaN(value)) return parseFloat(value);
            return value.trim();
          }
        }).data;

        if (parsedData.errors.length > 0) {
          throw new Error('Erreur de parsing CSV: ' + parsedData.errors[0].message);
        }

        const requiredColumns = ['reference', 'nom', 'categorie', 'quantite', 'prix'];
        const firstRow = parsedData[0];
        const missingColumns = requiredColumns.filter(col => !Object.keys(firstRow).includes(col));
        if (missingColumns.length > 0) {
          throw new Error(`Colonnes manquantes: ${missingColumns.join(', ')}`);
        }

        const transformedData = parsedData.map(row => ({
          id: row['id'] || Date.now().toString(),
          reference: row['reference'] || '',
          nom: row['nom'] || '',
          categorie: row['categorie'] || '',
          sousCategorie: row['sousCategorie'] || '',
          prix: parseFloat(row['prix'] || 0),
          quantite: parseInt(row['quantite'] || 0),
          photos: [],
          variations: [],
          dateAjout: new Date().toISOString(),
          dateMiseAJour: new Date().toISOString()
        }));

        console.log('Données importées:', transformedData);
        setImportSuccess(`Import réussi ! ${transformedData.length} articles ajoutés.`);
        setImportDialogOpen(false);
        setCsvFile(null);
      } catch (error) {
        setImportError(`Erreur lors de l'importation: ${error.message}`);
      }
    };

    reader.onerror = (error) => {
      setImportError('Erreur lors de la lecture du fichier');
    };

    reader.readAsText(csvFile);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleImportExport}
        startIcon={<DownloadIcon />}
      >
        Import/Export
      </Button>

      <Dialog
        open={importDialogOpen}
        onClose={() => {
          setImportDialogOpen(false);
          setCsvFile(null);
          setImportError('');
          setImportSuccess('');
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Import/Export des Stocks</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {importError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {importError}
              </Alert>
            )}
            {importSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {importSuccess}
              </Alert>
            )}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Importer un fichier CSV
              </Typography>
              <input
                accept=".csv"
                style={{ display: 'none' }}
                id="csv-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="csv-upload">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {csvFile ? csvFile.name : 'Sélectionner un fichier CSV'}
                </Button>
              </label>
              <Button
                onClick={handleImportSubmit}
                variant="contained"
                color="primary"
                disabled={!csvFile}
                fullWidth
                sx={{ mt: 2 }}
              >
                Importer
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setImportDialogOpen(false);
            setCsvFile(null);
            setImportError('');
            setImportSuccess('');
          }}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StocksTest;
