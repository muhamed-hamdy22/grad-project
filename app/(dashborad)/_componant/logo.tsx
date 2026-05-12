import Image from "next/image";

export const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full"
            />
        </div>
    );
};

export default Logo;