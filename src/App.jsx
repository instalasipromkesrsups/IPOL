import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  BedDouble, 
  Crown, 
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Save,
  CheckCheck,
  Building2,
  UserCircle,
  Calendar,
  Clock,
  Database,
  Search,
  History,
  Building,
  Edit3,
  RefreshCcw
} from 'lucide-react';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyDBEwnwo53rSdEXibdOcSuLUx6zNm3G4uq4d1yWaAC2JcPJ3tuBtKc3UN5VveZmawV/exec"; 

const extractStandardQty = (name) => {
  const match = name.match(/\((\d+)\s*(Unit|Buah|Set)\)/i);
  return match ? parseInt(match[1], 10) : 1;
};

const extractUnitType = (name) => {
  const match = name.match(/\((\d+)\s*(Unit|Buah|Set)\)/i);
  return match ? match[2] : 'Unit';
};

const cleanItemName = (name) => {
  return name.replace(/\s*\(\d+\s*(Unit|Buah|Set)\)/gi, '').trim();
};

const INVENTORY_DATA = {
  'President Suite': [
    { id: 'ps_1_1', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Bed Pasien (1 Unit)' },
    { id: 'ps_1_2', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Sofa bed (1 Set)' },
    { id: 'ps_1_3', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Sofa set (1 Set)' },
    { id: 'ps_1_4', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Drawer Pasien (1 Unit)' },
    { id: 'ps_1_5', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Drawer Kabinet (1 Unit)' },
    { id: 'ps_1_6', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'TV LED (2 Unit)' },
    { id: 'ps_1_7', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Meja Makan Pasien (1 Unit)' },
    { id: 'ps_1_8', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Jam Dinding (1 Buah)' },
    { id: 'ps_1_9', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Cermin kecil bulat (1 Unit)' },
    { id: 'ps_1_10', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Cermin besar panjang (1 Unit)' },
    { id: 'ps_1_11', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Tempat Sampah Kecil (1 Unit)' },
    { id: 'ps_1_12', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Tempat sampah besar (1 Unit)' },
    { id: 'ps_1_13', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Laci Make Up (1 Unit)' },
    { id: 'ps_1_14', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Alat Pewangi Ruangan Listrik (1 Unit)' },
    { id: 'ps_1_15', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Alat Pewangi Ruangan Baterai (1 Unit)' },
    { id: 'ps_1_16', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Lampu tidur (1 Unit)' },
    { id: 'ps_1_17', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Nampan Kaca (1 Unit)' },
    { id: 'ps_1_18', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Remote STB (1 Unit)' },
    { id: 'ps_1_19', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Remote TV Samsung (1 Unit)' },
    { id: 'ps_1_20', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Remote TV Navicom (1 Unit)' },
    { id: 'ps_1_21', category: '1.1 Kamar Pasien dan Ruang Tamu', name: 'Tissue (1 Unit)' },

    { id: 'ps_2_1', category: '1.2 Kamar Mandi Pasien', name: 'Tempat Sampah Kamar Mandi Utama (1 Unit)' },
    { id: 'ps_2_2', category: '1.2 Kamar Mandi Pasien', name: 'Keranjang Amenities Kamar Mandi Pasien (1 Set)' },
    { id: 'ps_2_3', category: '1.2 Kamar Mandi Pasien', name: 'Pispot (0 Unit)' },
    { id: 'ps_2_4', category: '1.2 Kamar Mandi Pasien', name: 'Keset (0 Unit)' },

    { id: 'ps_3_1', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Handuk besar pasien (1 Buah)' },
    { id: 'ps_3_2', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Handuk wajah pasien (1 Buah)' },
    { id: 'ps_3_3', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Handuk besar pendamping (2 Buah)' },
    { id: 'ps_3_4', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Handuk wajah pendamping (2 Buah)' },
    { id: 'ps_3_5', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Washlap (1 Buah)' },
    { id: 'ps_3_6', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Kimono handuk pasien (1 Buah)' },
    { id: 'ps_3_7', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Skort (Baju pasien) (1 Buah)' },
    { id: 'ps_3_8', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Teh, kopi, gula (1 Set)' },
    { id: 'ps_3_9', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Welcome fruit (1 Set)' },
    { id: 'ps_3_10', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Amenities (1 Set)' },
    { id: 'ps_3_11', category: '1.3 Kelengkapan Pasien dan Pendamping', name: 'Sandal (1 Set)' },

    { id: 'ps_4_1', category: '1.4 Ruang Makan Keluarga', name: 'Kursi dan Meja Makan (1 Set)' },
    { id: 'ps_4_2', category: '1.4 Ruang Makan Keluarga', name: 'Tatakan Kayu (6 Buah)' },
    { id: 'ps_4_3', category: '1.4 Ruang Makan Keluarga', name: 'Set cangkir (Teko putih, 6 cangkir, 4 pisin, 1 rak) (1 Set)' },
    { id: 'ps_4_4', category: '1.4 Ruang Makan Keluarga', name: 'Taplak meja panjang (Table runner) (1 Buah)' },
    { id: 'ps_4_5', category: '1.4 Ruang Makan Keluarga', name: 'Set wadah coffee and tea abu-abu (1 Set)' },
    { id: 'ps_4_6', category: '1.4 Ruang Makan Keluarga', name: 'Tempat Tissu (0 Buah)' },
    { id: 'ps_4_7', category: '1.4 Ruang Makan Keluarga', name: 'Jam Dinding (1 Buah)' },

    { id: 'ps_5_1', category: '1.5 Pantry', name: 'Tempat Sampah Kecil (1 Buah)' },
    { id: 'ps_5_2', category: '1.5 Pantry', name: 'Tempat Sampah Besar (Coklat) (1 Buah)' },
    { id: 'ps_5_3', category: '1.5 Pantry', name: 'Cangkir (4 Buah)' },
    { id: 'ps_5_4', category: '1.5 Pantry', name: 'Mangkok (4 Buah)' },
    { id: 'ps_5_5', category: '1.5 Pantry', name: 'Piring biru bulat kecil (4 Buah)' },
    { id: 'ps_5_6', category: '1.5 Pantry', name: 'Piring biru bulat besar (4 Buah)' },
    { id: 'ps_5_7', category: '1.5 Pantry', name: 'Sendok kecil gold pengaduk kopi (5 Buah)' },
    { id: 'ps_5_8', category: '1.5 Pantry', name: 'Satu set (2 sendok, 2 garpu, 1 lepek putih) (1 Buah)' },
    { id: 'ps_5_9', category: '1.5 Pantry', name: 'Satu garpu kecil (1 Buah)' },
    { id: 'ps_5_10', category: '1.5 Pantry', name: 'Nampan hijau (1 Buah)' },
    { id: 'ps_5_11', category: '1.5 Pantry', name: 'Lemari es (1 Unit)' },
    { id: 'ps_5_12', category: '1.5 Pantry', name: 'Microwave (1 Buah)' },
    { id: 'ps_5_13', category: '1.5 Pantry', name: 'Teko listrik (1 Buah)' },
    { id: 'ps_5_14', category: '1.5 Pantry', name: 'Tatakan microwave (1 Buah)' },
    { id: 'ps_5_15', category: '1.5 Pantry', name: 'Alat cuci piring (1 Buah)' },

    { id: 'ps_6_1', category: '1.6 Kamar Mandi Keluarga', name: 'Tempat Sampah Kamar Mandi Keluarga (1 Buah)' },
    { id: 'ps_6_2', category: '1.6 Kamar Mandi Keluarga', name: 'Sikat Kamar mandi (1 Buah)' },
    { id: 'ps_6_3', category: '1.6 Kamar Mandi Keluarga', name: 'Gelas Kumur (1 Buah)' },
    { id: 'ps_6_4', category: '1.6 Kamar Mandi Keluarga', name: 'Tatakan gelas kumur (1 Buah)' },
    { id: 'ps_6_5', category: '1.6 Kamar Mandi Keluarga', name: 'Keranjang pakaian (1 Buah)' },
    { id: 'ps_6_6', category: '1.6 Kamar Mandi Keluarga', name: 'Tempat Sampah Kecil (1 Buah)' },
    { id: 'ps_6_7', category: '1.6 Kamar Mandi Keluarga', name: 'Keranjang Amenities (1 Buah)' },

    { id: 'ps_7_1', category: '1.7 Kamar Tidur Keluarga', name: 'Set tempat tidur (bed, bantal, sprei, selimut) (2 Set)' },
    { id: 'ps_7_2', category: '1.7 Kamar Tidur Keluarga', name: 'Kursi dan Meja (3 Set)' },
    { id: 'ps_7_3', category: '1.7 Kamar Tidur Keluarga', name: 'Jam Dinding (1 Buah)' },
    { id: 'ps_7_4', category: '1.7 Kamar Tidur Keluarga', name: 'Hanger (2 Buah)' },
  ],
  'VVIP': [
    { id: 'vvip_1_1', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Bed Pasien (1 Unit)' },
    { id: 'vvip_1_2', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Sofa bed (1 Unit)' },
    { id: 'vvip_1_3', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Sofa tamu (1 Set)' },
    { id: 'vvip_1_4', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Drawer Pasien (1 Unit)' },
    { id: 'vvip_1_5', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Drawer Kabinet (1 Unit)' },
    { id: 'vvip_1_6', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'TV LED (2 Unit)' },
    { id: 'vvip_1_7', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Meja Makan Pasien (1 Unit)' },
    { id: 'vvip_1_8', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Jam Dinding (1 Buah)' },
    { id: 'vvip_1_9', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Tempat Sampah Kecil (1 Unit)' },
    { id: 'vvip_1_10', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Tempat sampah besar (1 Unit)' },
    { id: 'vvip_1_11', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Remote STB (1 Unit)' },
    { id: 'vvip_1_12', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Remote TV (1 Unit)' },
    { id: 'vvip_1_13', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Alat Pewangi Ruangan Listrik (1 Unit)' },
    { id: 'vvip_1_14', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Alat Pewangi Ruangan Baterai (1 Unit)' },
    { id: 'vvip_1_15', category: '2.1 Kamar Pasien dan Ruang Tamu', name: 'Tissue (1 Unit)' },

    { id: 'vvip_2_1', category: '2.2 Kamar Mandi', name: 'Tempat Sampah Kamar Mandi (1 Unit)' },
    { id: 'vvip_2_2', category: '2.2 Kamar Mandi', name: 'Keranjang Amenities Kamar Mandi (0 Set)' },
    { id: 'vvip_2_3', category: '2.2 Kamar Mandi', name: 'Pispot (1 Unit)' },
    { id: 'vvip_2_4', category: '2.2 Kamar Mandi', name: 'Keset (1 Unit)' },
    { id: 'vvip_2_5', category: '2.2 Kamar Mandi', name: 'Sikat Kamar mandi (0 Buah)' },
    { id: 'vvip_2_6', category: '2.2 Kamar Mandi', name: 'Gelas Kumur (0 Buah)' },
    { id: 'vvip_2_7', category: '2.2 Kamar Mandi', name: 'Tatakan gelas kumur (0 Buah)' },

    { id: 'vvip_3_1', category: '2.3 Kelengkapan Pasien', name: 'Handuk besar pasien (1 Buah)' },
    { id: 'vvip_3_2', category: '2.3 Kelengkapan Pasien', name: 'Handuk wajah pasien (1 Buah)' },
    { id: 'vvip_3_3', category: '2.3 Kelengkapan Pasien', name: 'Washlap (1 Buah)' },
    { id: 'vvip_3_4', category: '2.3 Kelengkapan Pasien', name: 'Skort (Baju pasien) (1 Buah)' },
    { id: 'vvip_3_5', category: '2.3 Kelengkapan Pasien', name: 'Welcome fruit (1 Set)' },
    { id: 'vvip_3_6', category: '2.3 Kelengkapan Pasien', name: 'Amenities (1 Set)' },
    { id: 'vvip_3_7', category: '2.3 Kelengkapan Pasien', name: 'Sandal (1 Set)' },

    { id: 'vvip_4_1', category: '2.4 Pantry', name: 'Kursi dan Meja Makan (1 Set)' },
    { id: 'vvip_4_2', category: '2.4 Pantry', name: 'Tempat Sampah Kecil (1 Buah)' },
    { id: 'vvip_4_3', category: '2.4 Pantry', name: 'Tempat Sampah Besar (1 Buah)' },
    { id: 'vvip_4_4', category: '2.4 Pantry', name: 'Cangkir (0 Buah)' },
    { id: 'vvip_4_5', category: '2.4 Pantry', name: 'Mangkok (0 Buah)' },
    { id: 'vvip_4_6', category: '2.4 Pantry', name: 'Piring bulat besar (0 Buah)' },
    { id: 'vvip_4_7', category: '2.4 Pantry', name: 'Piring bulat kecil (0 Buah)' },
    { id: 'vvip_4_8', category: '2.4 Pantry', name: 'Sendok (0 Buah)' },
    { id: 'vvip_4_9', category: '2.4 Pantry', name: 'Garpu (0 Buah)' },
    { id: 'vvip_4_10', category: '2.4 Pantry', name: 'Sendok dan garpu kecil (0 Buah)' },
    { id: 'vvip_4_11', category: '2.4 Pantry', name: 'Tempat Tissu (0 Buah)' },
    { id: 'vvip_4_12', category: '2.4 Pantry', name: 'Taplak meja panjang (Table runner) (0 Buah)' },
    { id: 'vvip_4_13', category: '2.4 Pantry', name: 'Lemari es (1 Unit)' },
    { id: 'vvip_4_14', category: '2.4 Pantry', name: 'Microwave (1 Buah)' },
    { id: 'vvip_4_15', category: '2.4 Pantry', name: 'Tatakan microwave (1 Buah)' },
    { id: 'vvip_4_16', category: '2.4 Pantry', name: 'Alat cuci piring (1 Buah)' },
  ],
  'VIP': [
    { id: 'vip_1_1', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Bed Pasien (1 Unit)' },
    { id: 'vip_1_2', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Sofa bed (1 Unit)' },
    { id: 'vip_1_3', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Sofa tamu (1 Set)' },
    { id: 'vip_1_4', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Drawer Pasien (1 Unit)' },
    { id: 'vip_1_5', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Drawer Kabinet (1 Unit)' },
    { id: 'vip_1_6', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'TV LED (1 Unit)' },
    { id: 'vip_1_7', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Meja Makan Pasien (1 Unit)' },
    { id: 'vip_1_8', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Jam Dinding (1 Buah)' },
    { id: 'vip_1_9', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Tempat Sampah Kecil (1 Unit)' },
    { id: 'vip_1_10', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Tempat sampah besar (1 Unit)' },
    { id: 'vip_1_11', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Remote STB (1 Unit)' },
    { id: 'vip_1_12', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Remote TV (1 Unit)' },
    { id: 'vip_1_13', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Alat Pewangi Ruangan Listrik (1 Unit)' },
    { id: 'vip_1_14', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Alat Pewangi Ruangan Baterai (1 Unit)' },
    { id: 'vip_1_15', category: '3.1 Kamar Pasien dan Ruang Tamu', name: 'Tissue (1 Unit)' },

    { id: 'vip_2_1', category: '3.2 Kamar Mandi', name: 'Tempat Sampah Kamar Mandi (1 Unit)' },
    { id: 'vip_2_2', category: '3.2 Kamar Mandi', name: 'Pispot (1 Unit)' },
    { id: 'vip_2_3', category: '3.2 Kamar Mandi', name: 'Keset (1 Unit)' },
    { id: 'vip_2_4', category: '3.2 Kamar Mandi', name: 'Sikat Kamar mandi (0 Buah)' },
    { id: 'vip_2_5', category: '3.2 Kamar Mandi', name: 'Gelas Kumur (0 Buah)' },
    { id: 'vip_2_6', category: '3.2 Kamar Mandi', name: 'Tatakan gelas kumur (0 Buah)' },

    { id: 'vip_3_1', category: '3.3 Kelengkapan Pasien', name: 'Handuk besar pasien (1 Buah)' },
    { id: 'vip_3_2', category: '3.3 Kelengkapan Pasien', name: 'Handuk wajah pasien (1 Buah)' },
    { id: 'vip_3_3', category: '3.3 Kelengkapan Pasien', name: 'Washlap (1 Buah)' },
    { id: 'vip_3_4', category: '3.3 Kelengkapan Pasien', name: 'Skort (Baju pasien) (1 Buah)' },
    { id: 'vip_3_5', category: '3.3 Kelengkapan Pasien', name: 'Amenities (1 Set)' },
    { id: 'vip_3_6', category: '3.3 Kelengkapan Pasien', name: 'Sandal (1 Set)' },

    { id: 'vip_4_1', category: '3.4 Pantry', name: 'Cangkir (0 Buah)' },
    { id: 'vip_4_2', category: '3.4 Pantry', name: 'Mangkok (0 Buah)' },
    { id: 'vip_4_3', category: '3.4 Pantry', name: 'Piring bulat besar (0 Buah)' },
    { id: 'vip_4_4', category: '3.4 Pantry', name: 'Piring bulat kecil (0 Buah)' },
    { id: 'vip_4_5', category: '3.4 Pantry', name: 'Sendok (0 Buah)' },
    { id: 'vip_4_6', category: '3.4 Pantry', name: 'Garpu (0 Buah)' },
    { id: 'vip_4_7', category: '3.4 Pantry', name: 'Sendok dan garpu kecil (0 Buah)' },
    { id: 'vip_4_8', category: '3.4 Pantry', name: 'Refrigator (1 Unit)' },
    { id: 'vip_4_9', category: '3.4 Pantry', name: 'Tatakan microwave (1 Buah)' },
    { id: 'vip_4_10', category: '3.4 Pantry', name: 'Alat cuci piring (1 Buah)' },
  ]
};

export default function App() {
  const [activeSessions, setActiveSessions] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  
  const [step, setStep] = useState(1);
  const [roomType, setRoomType] = useState('President Suite'); 
  const [actionType, setActionType] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [building, setBuilding] = useState('Gedung B'); 
  const [officerName, setOfficerName] = useState('');
  
  const [krsInputMode, setKrsInputMode] = useState('db'); 
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [mrsReferenceData, setMrsReferenceData] = useState(null);

  const [checkDate, setCheckDate] = useState('');
  const [checkTime, setCheckTime] = useState('');
  const [checklist, setChecklist] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchActiveSessions = async () => {
    setIsLoadingData(true);
    try {
      if (!WEB_APP_URL.includes("script.google.com")) return;
      const response = await fetch(WEB_APP_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setActiveSessions(data);
      }
    } catch (error) {
      console.error("Gagal mengambil data kamar aktif:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (actionType === 'KRS') {
      fetchActiveSessions();
      setKrsInputMode('db');
    }
  }, [actionType]);

  useEffect(() => {
    if (step === 1) {
      const now = new Date();
      setCheckDate(now.toISOString().split('T')[0]);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCheckTime(`${hours}:${minutes}`);
    }
  }, [step]);
  
  const currentItems = roomType ? INVENTORY_DATA[roomType] : [];
  const progress = currentItems.length > 0 
    ? Math.round((Object.keys(checklist).length / currentItems.length) * 100) 
    : 0;

  const handleMrsChange = (itemId, field, value, itemName) => {
    setChecklist(prev => {
      const current = prev[itemId] || {
        qty: extractStandardQty(itemName),
        unit: extractUnitType(itemName),
        status: 'Sesuai',
        note: ''
      };
      return {
        ...prev,
        [itemId]: { ...current, [field]: value }
      };
    });
  };

  const handleKrsChange = (itemId, status, condition = null) => {
    setChecklist(prev => ({
      ...prev,
      [itemId]: { 
        ...prev[itemId], 
        status,
        condition,
        note: status === 'Sesuai' ? '' : prev[itemId]?.note || '' 
      }
    }));
  };

  const handleNoteChange = (itemId, note) => {
    setChecklist(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], note }
    }));
  };

  const markAllRemainingAsOk = () => {
    const newChecklist = { ...checklist };
    currentItems.forEach(item => {
      if (!newChecklist[item.id]) {
        if (actionType === 'MRS') {
          newChecklist[item.id] = { qty: extractStandardQty(item.name), unit: extractUnitType(item.name), status: 'Sesuai', note: '' };
        } else {
          newChecklist[item.id] = { status: 'Sesuai', condition: 'Baik', note: '' };
        }
      }
    });
    setChecklist(newChecklist);
  };

  const isStep1Valid = actionType === 'MRS' 
    ? (roomType !== '' && actionType !== '' && roomNumber.trim() !== '' && building !== '' && officerName.trim() !== '' && checkDate !== '' && checkTime !== '')
    : (actionType === 'KRS' && officerName.trim() !== '' && checkDate !== '' && checkTime !== '' && 
        ((krsInputMode === 'db' && selectedSessionId !== '') || (krsInputMode === 'manual' && roomNumber.trim() !== '' && roomType !== '' && building !== '')));

  const isStep2Valid = currentItems.length > 0 && Object.keys(checklist).length === currentItems.length;

  const handleSelectSession = (sessionId) => {
    setSelectedSessionId(sessionId);
    const session = activeSessions.find(s => s.id === sessionId);
    if (session) {
      setRoomType(session.roomType);
      setRoomNumber(session.roomNumber);
      setBuilding(session.building || 'Gedung B');
      setMrsReferenceData(session);
    }
  };

  const sendDataToSpreadsheet = async (payloadData) => {
    try {
      if (!WEB_APP_URL.includes("script.google.com")) return;
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadData)
      });
    } catch (err) {
      console.error("Gagal kirim ke Spreadsheet:", err);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Pastikan sessionId selalu terkirim dengan benar (menggunakan ID database atau generate baru jika manual)
      const finalSessionId = selectedSessionId ? selectedSessionId : ("AUTO_" + new Date().getTime());

      await sendDataToSpreadsheet({
        sessionId: finalSessionId,
        building,
        roomNumber: roomNumber.toUpperCase(),
        roomType,
        actionType: actionType,
        officerName,
        checkDate,
        checkTime,
        checklist
      });

      setStep(4);
    } catch (error) {
      console.error("Error saving document: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1); setRoomType('President Suite'); setActionType(''); setRoomNumber(''); setBuilding('Gedung B');
    setOfficerName(''); setChecklist({}); setSelectedSessionId(''); setMrsReferenceData(null); setKrsInputMode('db');
  };

  const selectPredefinedOfficer = (name) => {
    setOfficerName(name);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="bg-blue-600 text-white p-5 rounded-b-[2rem] shadow-md z-10 relative">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck size={28} />
            <h1 className="text-2xl font-bold tracking-tight">Cek Inventaris</h1>
          </div>
          <p className="text-blue-100 text-sm font-medium">Sistem Terintegrasi Pengecekan Rawat Inap</p>
          <div className="absolute top-5 right-5 bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold backdrop-blur-sm">
            <Database size={14} className="text-green-300" /><span>Online</span>
          </div>
        </header>

        <div className="flex-1 px-5 py-6 space-y-6 pb-28 overflow-y-auto">
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <UserCircle size={20} className="text-blue-500"/> Petugas Pemeriksa
            </h2>
            <input 
              type="text" 
              placeholder="Nama Lengkap Anda" 
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium mb-2"
            />
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <span className="text-xs text-slate-400 font-medium py-1 shrink-0">Pilih cepat:</span>
              {['Priska', 'Intan'].map(name => (
                <button 
                  key={name}
                  onClick={() => selectPredefinedOfficer(name)}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shrink-0 border border-blue-100 active:bg-blue-200"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-slate-700 mb-3 px-1">Konteks Pemeriksaan</h2>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { setActionType('MRS'); setSelectedSessionId(''); setRoomNumber(''); }}
                className={`p-4 rounded-xl border-2 font-bold flex flex-col items-center gap-2 transition-all ${actionType === 'MRS' ? 'border-green-500 bg-green-50 text-green-700 shadow-sm' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
              >
                <span className="text-2xl block mb-1">🏥</span> Sebelum MRS
                <span className="text-xs font-normal text-center opacity-80">(Buka Sesi Kamar)</span>
              </button>
              <button 
                onClick={() => { setActionType('KRS'); setRoomNumber(''); }}
                className={`p-4 rounded-xl border-2 font-bold flex flex-col items-center gap-2 transition-all ${actionType === 'KRS' ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
              >
                <span className="text-2xl block mb-1">🏠</span> Sebelum KRS
                <span className="text-xs font-normal text-center opacity-80">(Tutup Sesi Kamar)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <h2 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-blue-500"/> Tanggal
              </h2>
              <input type="date" value={checkDate} onChange={(e) => setCheckDate(e.target.value)} className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <h2 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm">
                <Clock size={16} className="text-blue-500"/> Jam
              </h2>
              <input type="time" value={checkTime} onChange={(e) => setCheckTime(e.target.value)} className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none" />
            </div>
          </div>

          {actionType === 'MRS' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
              <div>
                <h2 className="font-bold text-slate-700 mb-3 px-1">Pilih Tipe Kamar</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'President Suite', icon: <Building size={20} />, color: 'purple' },
                    { id: 'VVIP', icon: <Crown size={20} />, color: 'indigo' },
                    { id: 'VIP', icon: <Star size={20} />, color: 'blue' }
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setRoomType(type.id)}
                      className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${roomType === type.id ? `border-${type.color}-500 bg-${type.color}-50 shadow-sm` : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${roomType === type.id ? `bg-${type.color}-100 text-${type.color}-600` : 'bg-slate-100 text-slate-500'}`}>
                          {type.icon}
                        </div>
                        <span className={`font-bold ${roomType === type.id ? `text-${type.color}-700` : 'text-slate-600'}`}>{type.id}</span>
                      </div>
                      {roomType === type.id && <CheckCircle2 className={`text-${type.color}-500`} size={24} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <h2 className="font-bold text-slate-700 mb-2 flex items-center gap-1.5 text-sm"><Building2 size={16} className="text-blue-500"/> Gedung</h2>
                  <select value={building} onChange={(e) => setBuilding(e.target.value)} className="w-full p-4 border-2 border-slate-200 rounded-xl font-bold bg-white">
                    <option value="Gedung B">Gedung B</option>
                    <option value="Gedung D">Gedung D</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <h2 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm"><BedDouble size={16} className="text-blue-500"/> Nomor Kamar</h2>
                  <input type="text" placeholder="Contoh: 301" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} className="w-full p-4 border-2 border-slate-200 rounded-xl uppercase text-lg font-bold" />
                </div>
              </div>
            </div>
          )}

          {actionType === 'KRS' && (
             <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
               
               <div className="grid grid-cols-2 gap-2 bg-slate-200 p-1 rounded-xl">
                 <button
                   onClick={() => { setKrsInputMode('db'); setSelectedSessionId(''); }}
                   className={`py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all
                     ${krsInputMode === 'db' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}
                 >
                   <Search size={16} /> Dari Kamar Aktif
                 </button>
                 <button
                   onClick={() => { setKrsInputMode('manual'); setSelectedSessionId(''); setMrsReferenceData(null); }}
                   className={`py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all
                     ${krsInputMode === 'manual' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-600'}`}
                 >
                   <Edit3 size={16} /> Input Manual
                 </button>
               </div>

               {krsInputMode === 'db' ? (
                 <div className="space-y-3">
                   <div className="flex justify-between items-center px-1">
                     <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2">Pilih Kamar Aktif (Database)</h2>
                     <button onClick={fetchActiveSessions} className="text-blue-600 flex items-center gap-1 text-xs font-bold bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">
                       <RefreshCcw size={12} className={isLoadingData ? "animate-spin" : ""} /> Refresh
                     </button>
                   </div>
                   
                   {isLoadingData ? (
                     <div className="bg-slate-100 p-6 rounded-2xl text-center border-2 border-slate-200">
                       <p className="text-slate-500 font-bold text-sm animate-pulse">Menarik data dari Spreadsheet...</p>
                     </div>
                   ) : activeSessions.length === 0 ? (
                     <div className="bg-slate-100 p-6 rounded-2xl text-center border-2 border-dashed border-slate-300">
                        <History size={32} className="text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 font-medium text-sm">Tidak ada kamar/pasien aktif saat ini.</p>
                        <p className="text-slate-500 text-xs mt-1">Silakan gunakan mode <b>Input Manual</b>.</p>
                     </div>
                   ) : (
                     <div className="space-y-3">
                       {activeSessions.map(session => (
                          <button
                            key={session.id}
                            onClick={() => handleSelectSession(session.id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center
                              ${selectedSessionId === session.id 
                                ? 'border-orange-500 bg-orange-50 shadow-sm' 
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-800 text-lg">{session.building || 'Gedung B'} - {session.roomNumber}</span>
                                <span className="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{session.roomType}</span>
                              </div>
                              <p className="text-xs text-slate-500">MRS: {session.mrsDate} oleh {session.mrsOfficer}</p>
                            </div>
                            {selectedSessionId === session.id && <CheckCircle2 className="text-orange-500" size={24} />}
                          </button>
                       ))}
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="space-y-4 animate-in fade-in duration-200">
                   <div>
                     <h2 className="font-bold text-slate-700 mb-3 px-1">Pilih Tipe Kamar</h2>
                     <div className="flex flex-col gap-3">
                       {[
                         { id: 'President Suite', icon: <Building size={20} />, color: 'purple' },
                         { id: 'VVIP', icon: <Crown size={20} />, color: 'indigo' },
                         { id: 'VIP', icon: <Star size={20} />, color: 'blue' }
                       ].map(type => (
                         <button
                           key={type.id}
                           onClick={() => setRoomType(type.id)}
                           className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${roomType === type.id ? `border-${type.color}-500 bg-${type.color}-50 shadow-sm` : 'border-slate-200 hover:border-slate-300'}`}
                         >
                           <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg ${roomType === type.id ? `bg-${type.color}-100 text-${type.color}-600` : 'bg-slate-100 text-slate-500'}`}>
                               {type.icon}
                             </div>
                             <span className={`font-bold ${roomType === type.id ? `text-${type.color}-700` : 'text-slate-600'}`}>{type.id}</span>
                           </div>
                           {roomType === type.id && <CheckCircle2 className={`text-${type.color}-500`} size={24} />}
                         </button>
                       ))}
                     </div>
                   </div>

                   <div className="grid grid-cols-3 gap-3">
                     <div className="col-span-1">
                       <h2 className="font-bold text-slate-700 mb-2 flex items-center gap-1.5 text-sm"><Building2 size={16} className="text-orange-500"/> Gedung</h2>
                       <select value={building} onChange={(e) => setBuilding(e.target.value)} className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 font-bold bg-white">
                         <option value="Gedung B">Gedung B</option>
                         <option value="Gedung D">Gedung D</option>
                       </select>
                     </div>
                     <div className="col-span-2">
                       <h2 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm"><BedDouble size={16} className="text-orange-500"/> Nomor Kamar</h2>
                       <input type="text" placeholder="Contoh: 301" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} className="w-full p-4 border-2 border-slate-200 rounded-xl uppercase text-lg font-bold" />
                     </div>
                   </div>
                 </div>
               )}
             </div>
          )}

        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            disabled={!isStep1Valid}
            onClick={() => setStep(2)}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${isStep1Valid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
          >
            Mulai Pengecekan <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const groupedItems = currentItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="sticky top-0 bg-white shadow-sm z-20 px-4 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setStep(1)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full"><ArrowLeft size={24} /></button>
            <div className="text-center">
              <h1 className="font-bold text-slate-800 uppercase">{building} - {roomNumber}</h1>
              <p className="text-xs font-medium text-slate-500">{roomType} • Sebelum {actionType}</p>
            </div>
            <div className="w-10"></div>
          </div>
          
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600">Progres Pengecekan</span>
            <span className="text-blue-600">{progress}% ({Object.keys(checklist).length}/{currentItems.length})</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </header>

        <div className="flex-1 p-4 pb-40 overflow-y-auto space-y-6">
          
          {progress > 0 && progress < 100 && (
            <button onClick={markAllRemainingAsOk} className="w-full py-3 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm">
              <CheckCheck size={20} /> Tandai Sisa Barang Sebagai {actionType === 'MRS' ? '"Sesuai"' : '"Baik"'}
            </button>
          )}

          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h3 className="font-bold text-slate-800 mb-3 px-1 border-l-4 border-blue-500 pl-3 sticky top-[104px] bg-slate-50 py-1 z-10">{category}</h3>
              <div className="space-y-3">
                {items.map(item => {
                  const checkData = checklist[item.id] || {};
                  const itemNameClean = cleanItemName(item.name);
                  const standardQty = extractStandardQty(item.name);
                  const unitType = extractUnitType(item.name);
                  const currentQty = checkData.qty !== undefined ? checkData.qty : standardQty;
                  const currentUnit = checkData.unit || unitType;
                  const currentStatus = checkData.status || 'Sesuai';
                  const condition = checkData.condition;
                  const pastMrsData = (actionType === 'KRS' && mrsReferenceData) ? mrsReferenceData.mrsChecklist[item.id] : null;
                  
                  return (
                    <div key={item.id} className={`bg-white p-4 rounded-xl shadow-sm border transition-colors ${checklist[item.id] ? 'border-blue-200' : 'border-slate-200'} flex flex-col gap-3`}>
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-slate-800 leading-snug">{itemNameClean}</span>
                        <span className="text-[11px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 shrink-0">Standar: {standardQty} {unitType}</span>
                      </div>
                      
                      {pastMrsData && (
                        <div className="bg-slate-50 text-slate-700 p-2.5 rounded-lg text-xs border border-slate-200 space-y-1">
                          <p>📥 <b>Saat MRS:</b> {pastMrsData.qty} {pastMrsData.unit} • Status: <span className={pastMrsData.status === 'Sesuai' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{pastMrsData.status}</span></p>
                          {pastMrsData.note && <p className="text-slate-500 italic">Catatan MRS: "{pastMrsData.note}"</p>}
                        </div>
                      )}
                      
                      {actionType === 'MRS' ? (
                        <div className="space-y-3 pt-1 border-t border-slate-100">
                          <div className="grid grid-cols-2 gap-3 items-center">
                            <div>
                              <label className="text-[11px] font-bold text-slate-400 block mb-1">JUMLAH FISIK</label>
                              <input type="number" min="0" value={currentQty} onChange={(e) => handleMrsChange(item.id, 'qty', parseInt(e.target.value) || 0, item.name)} className="w-full p-2.5 border-2 border-slate-200 rounded-lg font-bold text-slate-800 text-center focus:border-blue-500 outline-none"/>
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-slate-400 block mb-1">SATUAN</label>
                              <select value={currentUnit} onChange={(e) => handleMrsChange(item.id, 'unit', e.target.value, item.name)} className="w-full p-2.5 border-2 border-slate-200 rounded-lg font-bold text-slate-700 bg-white focus:border-blue-500 outline-none text-sm">
                                <option value="Unit">Unit</option><option value="Buah">Buah</option><option value="Set">Set</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-400 block mb-1">KETERANGAN</label>
                            <div className="grid grid-cols-2 gap-2">
                              <button onClick={() => handleMrsChange(item.id, 'status', 'Sesuai', item.name)} className={`py-2 rounded-lg font-bold text-xs border-2 transition-all ${currentStatus === 'Sesuai' ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>✅ Sesuai</button>
                              <button onClick={() => handleMrsChange(item.id, 'status', 'Kendala', item.name)} className={`py-2 rounded-lg font-bold text-xs border-2 transition-all ${currentStatus === 'Kendala' ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>⚠️ Kendala</button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                          <button onClick={() => handleKrsChange(item.id, 'Sesuai', 'Baik')} className={`py-2.5 rounded-lg font-bold text-xs transition-colors border-2 ${condition === 'Baik' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>✅ Baik</button>
                          <button onClick={() => handleKrsChange(item.id, 'Kendala', 'Kotor')} className={`py-2.5 rounded-lg font-bold text-xs transition-colors border-2 ${condition === 'Kotor' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>🧹 Kotor</button>
                          <button onClick={() => handleKrsChange(item.id, 'Kendala', 'Rusak')} className={`py-2.5 rounded-lg font-bold text-xs transition-colors border-2 ${condition === 'Rusak' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>⚠️ Rusak</button>
                          <button onClick={() => handleKrsChange(item.id, 'Kendala', 'Hilang')} className={`py-2.5 rounded-lg font-bold text-xs transition-colors border-2 ${condition === 'Hilang' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>❌ Hilang</button>
                        </div>
                      )}

                      {((actionType === 'MRS' && currentStatus === 'Kendala') || (actionType === 'KRS' && checklist[item.id]?.status === 'Kendala')) && (
                        <div className="mt-1 animate-in slide-in-from-top-2 duration-200">
                          <textarea placeholder="Tuliskan catatan detail kendala..." value={checkData.note || ''} onChange={(e) => handleNoteChange(item.id, e.target.value)} className="w-full p-2.5 border-2 border-red-200 rounded-lg focus:border-red-500 outline-none text-xs bg-red-50/30 min-h-[60px]"/>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
          <button disabled={!isStep2Valid} onClick={() => setStep(3)} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${isStep2Valid ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
            Lanjut Ringkasan <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    const issues = currentItems.filter(item => checklist[item.id]?.status === 'Kendala');
    const oks = currentItems.filter(item => checklist[item.id]?.status === 'Sesuai');

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="bg-white px-4 py-4 border-b border-slate-200 flex items-center gap-3 shadow-sm sticky top-0 z-10">
           <button onClick={() => setStep(2)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full"><ArrowLeft size={24} /></button>
          <h1 className="text-lg font-bold text-slate-800">Ringkasan Laporan</h1>
        </header>

        <div className="flex-1 p-4 pb-32 space-y-4 overflow-y-auto">
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-slate-500 font-medium mb-1">Gedung / Kamar</p><p className="font-bold text-slate-800 uppercase">{building} - {roomNumber}</p></div>
              <div><p className="text-xs text-slate-500 font-medium mb-1">Tipe Kamar</p><p className="font-bold text-slate-800">{roomType}</p></div>
              <div><p className="text-xs text-slate-500 font-medium mb-1">Tanggal & Jam</p><p className="font-bold text-slate-800">{checkDate} ({checkTime})</p></div>
              <div><p className="text-xs text-slate-500 font-medium mb-1">Konteks</p><p className={`font-bold ${actionType === 'MRS' ? 'text-green-600' : 'text-orange-600'}`}>Sebelum {actionType}</p></div>
              <div className="col-span-2 pt-3 border-t border-slate-100"><p className="text-xs text-slate-500 font-medium mb-1">Petugas Pemeriksa</p><p className="font-bold text-slate-800">{officerName}</p></div>
            </div>
          </div>

          {issues.length > 0 ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
              <h3 className="font-bold text-red-800 flex items-center gap-2 mb-3"><AlertCircle size={20} /> {issues.length} Item Memiliki Kendala</h3>
              <ul className="space-y-3">
                {issues.map(item => {
                  const checkData = checklist[item.id];
                  return (
                    <li key={item.id} className="bg-white p-3 rounded-lg shadow-sm border border-red-100">
                      <span className="font-semibold text-slate-800 text-sm block mb-1">{cleanItemName(item.name)}</span>
                      {actionType === 'MRS' && (<p className="text-xs text-slate-600 mb-1">Jumlah: <b>{checkData.qty} {checkData.unit}</b></p>)}
                      {actionType === 'KRS' && checkData.condition && (<span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-bold mb-1 mr-2">Kondisi: {checkData.condition}</span>)}
                      {checkData.note && (<p className="text-xs text-red-600 bg-red-50 p-2 rounded mt-1">Catatan: {checkData.note}</p>)}
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
              <CheckCircle2 size={48} className="text-green-500 mb-2" />
              <h3 className="font-bold text-green-800 text-lg">Semua Item {actionType === 'KRS' ? 'Kondisi Baik' : 'Sesuai'}!</h3>
              <p className="text-green-600 text-sm mt-1">{actionType === 'MRS' ? 'Kamar siap untuk digunakan.' : 'Tidak ada inventaris bermasalah saat pasien pulang.'}</p>
            </div>
          )}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-600">Total Item Sesuai/Baik</span><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{oks.length} Item</span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting} 
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md disabled:opacity-70 disabled:cursor-wait"
          >
            {isSubmitting ? 'Menyimpan ke Spreadsheet...' : <><Save size={20} /> Simpan Laporan</>}
          </button>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center font-sans p-6 text-center">
        <div className="bg-white/20 p-5 rounded-full mb-6 animate-bounce"><div className="bg-white p-4 rounded-full"><CheckCheck size={64} className="text-blue-600" /></div></div>
        <h1 className="text-3xl font-bold text-white mb-2">Data Tersimpan!</h1>
        <p className="text-blue-100 mb-8 max-w-sm">Sesi Kamar {building} - {roomNumber.toUpperCase()} berhasil ditutup dan dikirim ke Spreadsheet.</p>
        <button onClick={resetForm} className="w-full max-w-sm py-4 rounded-xl bg-white text-blue-700 font-bold flex items-center justify-center gap-2"><History size={20} /> Kembali ke Menu Utama</button>
      </div>
    );
  }

  return null;
}
