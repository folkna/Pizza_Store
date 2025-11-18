import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {type AppDispatch, type RootState } from '../../store/store';
import { addAddress, type PostAddress } from '../../store/addressSlice';

// แก้ไขไอคอนตำแหน่งที่ตั้งในแผนที่
delete (L.Icon.Default.prototype as any)._getIconUrl;

// กำหนดค่าไอคอนใหม่
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Address = ({ onSelect }: { onSelect?: (lat: number, lng: number) => void }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [position, setPosition] = useState<[number, number]>([13.736717, 100.523186]);
    const [address, setAddress] = useState("");
    const member = useSelector((state: RootState) => state.auth.member);

    // ตัวจัดการเหตุการณ์คลิกบนแผนที่
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                if (onSelect) onSelect(e.latlng.lat, e.latlng.lng);
            }
        });
        return null;
    };

    // ค้นหาที่อยู่จากชื่อสถานที่
    const searchaddress = async (address: string) => {
        try {
            const res = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: address,
                    format: 'json',
                    limit: 1
                }
            });

            if (res.data.length === 0) return;

            const { lat, lon } = res.data[0];
            const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];

            setPosition(coords);
            onSelect?.(coords[0], coords[1]);
        } catch (err) {
            console.error('Error fetching coordinates:', err);
        }
    };

    // อัพเดตที่อยู่เมื่อมีการค้นหา
    const MapUpdater = ({ position }: { position: [number, number] }) => {
        const map = useMap();
        map.setView(position, map.getZoom());
        return null;
    };

    // ส่งข้อมูลที่อยู่ไปยัง backend
    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: {
                lat: position[0],
                lon: position[1],
                format: "json"
            }
        });


        const address_string = res.data.display_name;

        try {
            const body: PostAddress = {
                Mem_Id: String(member?.memberId),
                Address_Latitude: position[0],
                Address_Longitude: position[1],
                Address_String: address_string,
            };

            await dispatch(addAddress(body)).unwrap();

            await Swal.fire({
                title: 'บันทึกข้อมูลที่อยู่เสร็จสิ้น!',
                text: 'กลับไปยังหน้าแรก',
                icon: 'success',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
                timer: 2000,
                timerProgressBar: true,
            });

            navigate("/");

        } catch (err) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถบันทึกข้อมูลที่อยู่ได้',
                icon: 'error',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
                timer: 2000,
            });
        }
    };


    return (
        <>
            <div className="flex flex-col gap-4 ">
                <div className="flex flex-1 flex-col justify-center items-center w-full gap-4 p-4">
                    <p className="text-2xl font-bold">เลือกตำแหน่งที่อยู่ของคุณ</p>

                    {/* ช่องค้นหาที่อยู่ */}
                    <div className="flex flex-row justify-center items-center w-1/2 gap-4">
                        <input type="text" className="px-3 py-2 bg-white border border-black focus:outline-red-600 w-4/5 rounded-md" placeholder='กรอกชื่อสถานที่' onChange={(e) => setAddress(e.target.value)}></input>
                        <button
                            className="w-1/5 px-3 py-2  rounded-md text-black font-semibold bg-gray-50 hover:bg-gray-100 border border-black cursor-pointer"
                            onClick={() => { searchaddress(address) }}
                        >
                            ค้นหา
                        </button>
                    </div>

                    {/* แผนที่ */}
                    <div className="flex flex-col justify-center items-center h-[500px] w-1/2 border border-red-500 shadow-sm shadow-red-400">
                        <MapContainer center={position} zoom={13} className="w-full h-full rounded-md">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MapClickHandler />
                            <Marker position={position}></Marker>
                            <MapUpdater position={position} />
                        </MapContainer>
                    </div>
                    
                    {/* ปุ่มยืนยันการเลือกตำแหน่ง */}
                    <button className="w-[20%] p-4 text-lg rounded-md text-white bg-red-500 hover:bg-red-600 cursor-pointer font-semibold" onClick={handlesubmit}>ยืนยันการเลือกตำแหน่ง</button>
                </div>
            </div>
        </>
    );
};

export default Address;