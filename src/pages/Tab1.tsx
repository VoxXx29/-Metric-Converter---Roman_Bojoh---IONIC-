import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonSelect, IonSelectOption, IonInput, IonLabel, IonText, IonButton } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [metric, setMetric] = useState<string | undefined>(undefined);
  const [unitFrom, setUnitFrom] = useState<string | undefined>(undefined);
  const [unitTo, setUnitTo] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<number | undefined>(undefined);

  // Definisi metrik dan satuannya
  const metrics: { [key: string]: string[] } = {
    Panjang: ['Meter', 'Kilometer', 'Centimeter'],
    Berat: ['Kilogram', 'Gram', 'Pound'],
    Volume: ['Liter', 'Mililiter', 'Gallon']
  };

  const handleConvert = () => {
    if (unitFrom && unitTo && value !== undefined) {
      let conversionFactor = 1;
      if (metric === 'Panjang') {
        // Konversi untuk Panjang
        if (unitFrom === 'Meter' && unitTo === 'Kilometer') conversionFactor = 0.001;
        else if (unitFrom === 'Kilometer' && unitTo === 'Meter') conversionFactor = 1000;
        else if (unitFrom === 'Meter' && unitTo === 'Centimeter') conversionFactor = 100;
        else if (unitFrom === 'Centimeter' && unitTo === 'Meter') conversionFactor = 0.01;
        else if (unitFrom === 'Kilometer' && unitTo === 'Centimeter') conversionFactor = 100000;
        else if (unitFrom === 'Centimeter' && unitTo === 'Kilometer') conversionFactor = 0.00001;
      } else if (metric === 'Berat') {
        // Konversi untuk Berat
        if (unitFrom === 'Kilogram' && unitTo === 'Gram') conversionFactor = 1000;
        else if (unitFrom === 'Gram' && unitTo === 'Kilogram') conversionFactor = 0.001;
        else if (unitFrom === 'Kilogram' && unitTo === 'Pound') conversionFactor = 2.20462;
        else if (unitFrom === 'Pound' && unitTo === 'Kilogram') conversionFactor = 0.453592;
      } else if (metric === 'Volume') {
        // Konversi untuk Volume
        if (unitFrom === 'Liter' && unitTo === 'Mililiter') conversionFactor = 1000;
        else if (unitFrom === 'Mililiter' && unitTo === 'Liter') conversionFactor = 0.001;
        else if (unitFrom === 'Liter' && unitTo === 'Gallon') conversionFactor = 0.264172;
        else if (unitFrom === 'Gallon' && unitTo === 'Liter') conversionFactor = 3.78541;
      }
      
      // Jika unitFrom dan unitTo adalah sama, maka hasilnya sama dengan nilai awal
      if (unitFrom === unitTo) {
        setResult(value);
      } else {
        setResult(value * conversionFactor);
      }
    }
  };

  const handleValueChange = (e: any) => {
    const newValue = parseFloat(e.detail.value);
    if (isNaN(newValue)) {
      alert('Input harus berupa angka!');
    } else {
      setValue(newValue);
    }
  };

  // Format hasil konversi
  const formatResult = (result: number | undefined) => {
    if (result === undefined) return 'Hasil akan muncul di sini';
    // Jika nilai adalah integer, tampilkan tanpa desimal
    if (Math.floor(result) === result) {
      return result.toString();
    }
    // Tampilkan dengan desimal jika tidak integer
    return result.toFixed(4);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Metric Converter</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonText color="medium" style={{ fontSize: 'small' }}>
            By: Roman Yohanes Precidente Bojoh
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Dari:</IonLabel>
          <IonSelect
            value={metric}
            placeholder="Pilih Metric"
            onIonChange={e => {
              setMetric(e.detail.value);
              setUnitFrom(undefined);
              setUnitTo(undefined);
            }}
          >
            {Object.keys(metrics).map((metricName, index) => (
              <IonSelectOption key={index} value={metricName}>{metricName}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Satuan Awal:</IonLabel>
          <IonSelect
            value={unitFrom}
            placeholder="Pilih Satuan"
            onIonChange={e => setUnitFrom(e.detail.value)}
            disabled={!metric}
          >
            {metric && metrics[metric].map((unit: string, index: number) => (
              <IonSelectOption key={index} value={unit}>{unit}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Ke Satuan:</IonLabel>
          <IonSelect
            value={unitTo}
            placeholder="Pilih Satuan"
            onIonChange={e => setUnitTo(e.detail.value)}
            disabled={!metric}
          >
            {metric && metrics[metric].map((unit: string, index: number) => (
              <IonSelectOption key={index} value={unit}>{unit}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Nilai:</IonLabel>
          <IonInput
            type="number"
            onIonChange={handleValueChange}
            disabled={!unitFrom || !unitTo}
          />
        </IonItem>

        {/* Tombol Submit */}
        <IonButton expand="block" onClick={handleConvert} disabled={!unitFrom || !unitTo || value === undefined}>
          Convert
        </IonButton>

        <IonItem>
          <IonLabel>Hasil:</IonLabel>
          <IonText>{formatResult(result)}</IonText>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
