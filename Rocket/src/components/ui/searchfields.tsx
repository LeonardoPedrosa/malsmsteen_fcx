const SearchFieldsCheckbox = ({
  selectedFields,
  handleFieldCheckboxChange,
}) => {
  return (
    <div className="text-sm flex gap-3">
      <label>
        <input
          style={{ all: "revert" }}
          type="checkbox"
          checked={selectedFields.name}
          onChange={() => handleFieldCheckboxChange("name")}
        />
        Nome
      </label>
      <label>
        <input
          style={{ all: "revert" }}
          type="checkbox"
          checked={selectedFields.document}
          onChange={() => handleFieldCheckboxChange("document")}
        />
        Documento
      </label>
      <label>
        <input
          style={{ all: "revert" }}
          type="checkbox"
          checked={selectedFields.email}
          onChange={() => handleFieldCheckboxChange("email")}
        />
        E-mail
      </label>
      <label>
        <input
          style={{ all: "revert" }}
          type="checkbox"
          checked={selectedFields.phone}
          onChange={() => handleFieldCheckboxChange("phone")}
        />
        Geração
      </label>
    </div>
  );
};

export default SearchFieldsCheckbox;
