import React, { useMemo } from "react";

export interface IDetailsInformationInit {
  id: number,
  result: undefined | JSX.Element | number | string,
  header: string,
  extraClass?: string,
}

export interface IDetailInformation {
  id: number,
  result: undefined | JSX.Element | number | string,
  header: string,
  extraClass?: string,
}

export const checkResultToUndefined = (element: IDetailsInformationInit): element is IDetailInformation => {
  return typeof element.result !== typeof undefined;
};

export const renderDetailsInformations = (data: IDetailInformation[], detailClass: string): Array<JSX.Element> => {
  return data.map((element) => {
    let containerClass = "";
    if (element.extraClass) {
      containerClass = element.extraClass;
    }
    // Возвращаемое значение для текстовой информации о фильме
    // Если тип object, значит значение компонент, возвращаем этот компонент внутри фрагмента
    // Если тип string | number, значит пришло обычное значение, возвращаем информацию внутри тега p
    const textInformation = typeof element.result === "object"
      ? <>{element.result}</>
      : <p className={`${detailClass}__info-text`}>{element.result}</p>;
    return (
      <div className={`${detailClass}__info ${containerClass}`} key={element.id}>
        <div className={`${detailClass}__info-header`}>
          {element.header}
          {" "}
          :
        </div>
        { textInformation }
      </div>
    );
  });
};
