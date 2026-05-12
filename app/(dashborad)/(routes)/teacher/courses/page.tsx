import  Link from "next/link";

const coursespage = () => {
    return (
        <div className="p-6">
            <Link href="/teacher/create">
                <button>
                    new course
                </button>
            </Link>
        </div>
    )
}
export default coursespage;