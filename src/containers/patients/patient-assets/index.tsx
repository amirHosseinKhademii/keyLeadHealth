import { Table } from "components";
import { memo } from "react";
import { PatientAssetsDetails } from "./patient-assets-details";
import { PatientAssetsToolbar } from "./patient-assets-toolbar";
import { usePatientAssets } from "./use-patient-assets";

export const PatientAssets = memo(() => {
  const { data, columns, page, onPaginate, isLoading } = usePatientAssets();

  return (
    <div className="w-full">
      <PatientAssetsToolbar />
      <Table
        className="w-full my-10"
        columns={columns}
        total={data.count}
        data={data.results}
        page={page}
        onPaginate={onPaginate}
        expand={(item) => <PatientAssetsDetails />}
        loading={isLoading}
      />
    </div>
  );
});
