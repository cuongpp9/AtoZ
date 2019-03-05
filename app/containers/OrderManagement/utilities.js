import shortid from 'shortid';
import { orderEnum } from 'constantsApp';
import moment from 'moment';

export function addServicesPackage(packageInfo) {
  const servicePackage = [];
  packageInfo.components.forEach(el => {
    servicePackage.push({
      id: shortid(),
      action: orderEnum.action.add,
      status: orderEnum.status.create,
      packageId: packageInfo.id,
      packageName: packageInfo.name,
      bundleId: el.bundleId,
      serviceType: el.serviceType,
      lines: [],
    });
  });

  return servicePackage;
}

export function addLinesPackage(bundleComponent, id, servicePackage) {
  const service = servicePackage.find(el => el.id === id);
  const lines = [];
  bundleComponent.forEach(el => {
    lines.push({
      id: shortid(),
      action: orderEnum.action.add,
      status: orderEnum.status.create,
      priceOfferId: el.priceOfferId,
    });
  });
  service.lines = lines;
  return servicePackage;
}

export function parseLines(lines) {
  const dataLines = lines.map((item, index) => ({
    index: index + 1,
    action: item.action,
    status: item.status,
    reason: item.reason || null,
    quantity: item.quantity || null,
    priceOverride: item.priceOverride || null,
    priceOffset: item.priceOffset || null,
    discountPercent: item.discountPercent || null,
    startDate: item.startDate
      ? moment(item.startDate).format('YYYY-MM-DD')
      : null,
    endDate: item.endDate ? moment(item.endDate).format('YYYY-MM-DD') : null,
    relativeStart: item.relativeStart || null,
    relativeEnd: item.relativeEnd || null,
    relativeStartUnit: item.relativeStartUnit || null,
    relativeEndUnit: item.relativeEndUnit || null,
    priceOfferId: item.priceOfferId,
    discountOfferId: item.discountOfferId || null,
  }));

  return dataLines;
}

export function createServicePriceOffer(poSelected) {
  const serviceAlaCarte = [];
  poSelected.forEach(el => {
    const service = serviceAlaCarte.find(
      subEl => subEl.serviceType === el.serviceType,
    );

    if (service) {
      service.lines.push({
        id: el.id,
        action: orderEnum.action.add,
        status: orderEnum.status.create,
        priceOfferId: el.id,
      });
    } else {
      serviceAlaCarte.push({
        id: el.serviceType,
        action: orderEnum.action.add,
        status: orderEnum.status.create,
        serviceType: el.serviceType,
        lines: [
          {
            id: el.id,
            action: orderEnum.action.add,
            status: orderEnum.status.create,
            priceOfferId: el.id,
          },
        ],
      });
    }
  });

  return serviceAlaCarte;
}
