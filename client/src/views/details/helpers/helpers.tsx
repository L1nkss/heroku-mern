import React from "react";

export interface IDetailsInformationInit {
  id: number,
  result: JSX.Element | undefined,
  header: string,
  extraClass?: string,
}

export interface IDetailInformation {
  id: number,
  result: JSX.Element,
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
    return (
      <div className={`${detailClass}__info ${containerClass}`} key={element.id}>
        <h3 className={`${detailClass}__info-header`}>
          {element.header}
          {" "}
          :
        </h3>
        { element.result }
      </div>
    );
  });
};
