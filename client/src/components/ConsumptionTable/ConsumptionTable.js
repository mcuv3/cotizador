import React, { useState } from "react";
import MaterialTable from "material-table";
import Button from "components/CustomButtons/Button";

export default function Consumptions({
  consumptions,
  setConsumptions,
  updateConsumptions,
  updatable,
}) {
  const [update, setUpdate] = useState(false);
  const editableConsumption = () => {
    setUpdate(false);
    updateConsumptions(consumptions.data);
  };
  return (
    <>
      <MaterialTable
        title="Consumos/Costos"
        columns={consumptions.columns}
        data={consumptions.data}
        options={{
          search: false,
          filtering: false,
          selection: false,
          pageSize: 6,
          pageSizeOptions: [],
        }}
        editable={{
          onRowAdd: (newItem) => {
            setConsumptions((prevState) => {
              const data = [...prevState.data];
              const currentIndex = data[data.length - 1]?.tableData.id || 0;
              let n = 0;

              const isAlreadyMeasurer = data.find(
                (i) => i.num_measure === newItem.num_measure
              );

              if (!isAlreadyMeasurer)
                while (n < 6) {
                  data.push({
                    ...newItem,
                    bimester: n + 1,
                    edited: n === 0 ? true : false,
                    tableData: { id: currentIndex + n },
                  });
                  n++;
                }
              updatable && setUpdate(true);
              return { ...prevState, data };
            });
            return Promise.resolve();
          },
          onRowUpdate: (newItem, oldItem) => {
            if (oldItem) {
              setConsumptions((prevState) => {
                const data = [...prevState.data];
                const editableConsumption = data[data.indexOf(oldItem)];
                const shouldUpdate =
                  editableConsumption.kw !== newItem.kw ||
                  editableConsumption.cost !== newItem.cost;

                data[data.indexOf(oldItem)] = shouldUpdate
                  ? { ...newItem, edited: true }
                  : editableConsumption;

                if (shouldUpdate) {
                  const currentMeasurer = newItem.num_measure;
                  const currentMeasurerTable = [
                    ...data.filter((i) => i.num_measure === currentMeasurer),
                  ];

                  const hightestConsumptionItemEdited = currentMeasurerTable
                    .sort(
                      (a, b) => a.num_measure === currentMeasurer && a.kw - b.kw
                    )
                    .reverse()
                    .find((i) => i.edited && i);

                  currentMeasurerTable.forEach((i) => {
                    const isEdited = i.edited;
                    if (!isEdited) {
                      i.kw = hightestConsumptionItemEdited.kw;
                      i.cost = hightestConsumptionItemEdited.cost;
                    }
                  });
                }
                updatable && setUpdate(true);
                return {
                  ...prevState,
                  data,
                };
              });
            }
            return Promise.resolve();
          },
          onRowDelete: (oldItem) => {
            setConsumptions((prevState) => {
              const data = [
                ...prevState.data.filter(
                  (i) => i.num_measure !== oldItem.num_measure
                ),
              ];
              return { ...prevState, data };
            });
            return Promise.resolve(updatable && setUpdate(true));
          },
        }}
        localization={{
          pagination: {
            labelDisplayedRows: "",
            previousAriaLabel: "Atras",
            previousTooltip: "Atras",
            nextTooltip: "Siguiente",
            nextAriaLabel: "Siguiente",
            firstAriaLabel: "Primera Página",
            firstTooltip: "Primera Página",
            lastAriaLabel: "Última Página",
            lastTooltip: "Última Página",
            labelRowsPerPage: "",
            labelRowsSelect: "",
          },
          toolbar: {
            nRowsSelected: "{0} row(s) selected",
            exportAriaLabel: "Guardar Cambios",
            exportTitle: "Guardar Cambios",
          },
          header: {
            actions: "Acciones",
          },
          body: {
            emptyDataSourceMessage: "No hay consumos",
            filterRow: {
              filterTooltip: "Filter",
            },
            addTooltip: "Agregar",
            editTooltip: "Editar",
            deleteTooltip: "Eliminar",
            editRow: {
              cancelTooltip: "Cancelar",
              saveTooltip: "Confirmar",
              deleteText: "Se eliminaran todos los consumos del medidor",
            },
          },
        }}
      />
      {update && (
        <Button color="success" onClick={editableConsumption}>
          Aplicar Cambios
        </Button>
      )}
    </>
  );
}
