import { FaInstagram , FaFacebook , FaTwitter } from 'react-icons/fa';



const Footer = () => {

    return (
        <>
            <footer className="w-full bg-gray-700 shadow-md p-7">
                <div className="flex flex-row justify-center items-center w-full mx-auto h-[75px]">
                    <div className="flex flex-1 flex-col items-center gap-4">
                        <div className="flex justify-center items-center h-full gap-10">
                            <FaInstagram size = {30} />
                            <FaFacebook size = {30} />
                            <FaTwitter  size = {30}/>
                        </div>
                        <hr className='border-t border-black w-[200px]'></hr>
                        <p className='text-sm'>Copyright Pizza Project.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer