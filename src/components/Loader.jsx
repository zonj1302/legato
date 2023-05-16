import { loader } from '../assets/assets';

function Loader({ title }) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <img src={ loader } alt="loader" className="w-32 h-32 object-contain" />
            <h1 className="font-bold text-3xl text-white mt-3">{ "Loading..." || title }</h1>
        </div>
    )
}

export default Loader;