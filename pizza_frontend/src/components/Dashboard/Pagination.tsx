
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {

  // ฟังก์ชันเพื่อรับหมายเลขหน้าที่จะต้องแสดง
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {

      // ถ้าน้อยกว่า 5 หน้า แสดงทั้งหมด
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); // หน้าแรก

      if (currentPage > 3) {
        pages.push("..."); // จุด ...
      }

      // หน้าก่อนหน้า / ปัจจุบัน / ถัดไป
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("..."); // จุด ...
      }

      pages.push(totalPages); // หน้าสุดท้าย
    }

    return pages;
  };

  return (
    <div className="flex gap-2 mt-4">

      {/* ปุ่มก่อนหน้า */}
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="px-3 py-1 border rounded-md cursor-pointer"
      >
        Prev
      </button>

      {/* แสดงหมายเลขหน้า */}
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(Number(page))}
            className={`px-3 py-1 border rounded-md cursor-pointer ${
              page === currentPage ? "bg-red-500 text-white " : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* ปุ่มถัดไป */}
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 border rounded-md cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;