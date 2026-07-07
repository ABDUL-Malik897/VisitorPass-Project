import * as XLSX from "xlsx";

const ExportVisitors = (visitors) => {

    const data = visitors.map((visitor) => ({
        Name: visitor.Name,
        Email: visitor.Email,
        Phone: visitor.Phone,
        Purpose: visitor.Purpose,
        Employee: visitor.Employee,
        VisitDate: new Date(visitor.VisitDate).toLocaleDateString(),
        VisitTime: visitor.VisitTime,
        Status: visitor.Status,
        CheckIn: visitor.VisitStart || "-",
        CheckOut: visitor.VisitEnd || "-"
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Visitors"
    );
    XLSX.writeFile(
        workbook,
        "Visitors.xlsx"
    );
};

export default ExportVisitors;