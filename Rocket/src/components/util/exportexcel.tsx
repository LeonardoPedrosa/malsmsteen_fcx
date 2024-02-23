import * as XLSX from "xlsx";
import { Button } from "../ui/button";
import { FileDown } from "lucide-react";

const ExportToExcel = ({ data }) => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div>
      <Button onClick={exportToExcel}>
        <FileDown className="size-3" />
        Exportar
      </Button>
    </div>
  );
};

export default ExportToExcel;
