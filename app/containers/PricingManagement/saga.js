import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { queryRequest, mutationRequest } from 'utils/request';
import {
  searchItems,
  getItemDetail,
  createItem,
  searchPriceOffers,
  getPriceOfferDetail,
  createPriceOffer,
  modifyItem,
  updateItemStatus,
  modifyPriceOffer,
  updatePriceOfferStatus,
} from 'api';
import {
  resetNotification,
  setNotification,
} from 'containers/Notification/actions';
import { NotificationTypes } from 'constantsApp';
import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

// ------ Items
export function* searchListItems({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchItems({ page, size, filter, sort }),
    );
    if (response.searchItems) {
      yield put(actions.searchItemsSuccess(response.searchItems));
    } else {
      yield put(
        actions.searchItemsFailure(
          'Failed to fetch items. Please try again or check your network!',
        ),
      );
    }

    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchItemsFailure(
        'Failed to fetch items. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* getItemSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getItemDetail(payload));
    if (response.getItemById) {
      yield put(actions.getItemDetailSuccess(response.getItemById));
    } else {
      yield put(
        actions.getItemDetailFailure(`Can not get detail for item ${payload}`),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getItemDetailFailure(`Can not get detail for item ${payload}`),
    );
  }
}

export function* createItemSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, createItem(dataCreate));
    yield put(actions.createItemSuccess());
    yield cb();
    yield put(isEndConnected());
    if (response.createItem && response.createItem.id) {
      yield put(
        push(`/pricing-management/items/${response.createItem.id}/detail`),
      );
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: 'Pricing Item created successfully!',
        }),
      );
    } else {
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: 'Pricing Item created failed!',
        }),
      );
    }
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Pricing Item created failed!',
      }),
    );
    cb();
  }
}

export function* modifyItemSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, modifyItem(dataCreate));
    yield put(actions.modifyItemSuccess(response.modifyItem));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Pricing Item updated successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Pricing Item updated failed!',
      }),
    );
    cb({ success: false });
  }
}

export function* updateItemStatusSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, updateItemStatus(payload));
    yield put(actions.updateItemStatusSuccess(response.updateItemStatus));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: "Pricing Item's status updated successfully!",
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: "Pricing Item's status updated failed!",
      }),
    );
    cb({ success: false });
  }
}

// -------Price Offers
export function* searchListPriceOffers({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchPriceOffers({ page, size, filter, sort }),
    );
    if (response.searchPriceOffers) {
      yield put(actions.searchPriceOffersSuccess(response.searchPriceOffers));
    } else {
      yield put(
        actions.searchPriceOffersFailure(
          'Failed to fetch Price Offers. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchPriceOffersFailure(
        'Failed to fetch Price Offers. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* getPriceOfferSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getPriceOfferDetail(payload));
    if (response.getPriceOfferById) {
      yield put(actions.getPriceOfferDetailSuccess(response.getPriceOfferById));
    } else {
      yield put(
        actions.getPriceOfferDetailFailure(
          `Can not get detail for price offer ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getPriceOfferDetailFailure(
        `Can not get detail for price offer ${payload}`,
      ),
    );
  }
}

export function* createPriceOfferSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, createPriceOffer(dataCreate));
    yield put(actions.createPriceOfferSuccess());
    yield cb();
    yield put(isEndConnected());
    if (response.createPriceOffer && response.createPriceOffer.id) {
      yield put(
        push(
          `/pricing-management/price-offers/${
            response.createPriceOffer.id
          }/detail`,
        ),
      );
    } else {
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: 'Pricing Price Offer created failed!',
        }),
      );
    }

    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Pricing Price Offer created successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Pricing Price Offer created failed!',
      }),
    );
    cb();
  }
}

export function* modifyPriceOfferSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, modifyPriceOffer(dataCreate));
    yield put(actions.modifyPriceOfferSuccess(response.modifyPriceOffer));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Pricing Price Offer updated successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Pricing Price Offer updated failed!',
      }),
    );
    cb({ success: false });
  }
}

export function* updatePriceOfferStatusSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(
      mutationRequest,
      updatePriceOfferStatus(payload),
    );
    yield put(
      actions.updatePriceOfferStatusSuccess(response.updatePriceOfferStatus),
    );
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: "Pricing Price Offer's status updated successfully!",
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: "Pricing Price Offer's status updated failed!",
      }),
    );
    cb({ success: false });
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* pricingSaga() {
  yield takeLatest(types.SEARCH_ITEMS, searchListItems);
  yield takeLatest(types.GET_ITEM_DETAIL, getItemSaga);
  yield takeLatest(types.CREATE_ITEM, createItemSaga);
  yield takeLatest(types.MODIFY_ITEM, modifyItemSaga);
  yield takeLatest(types.UPDATE_ITEM_STATUS, updateItemStatusSaga);

  yield takeLatest(types.SEARCH_PRICE_OFFERS, searchListPriceOffers);
  yield takeLatest(types.GET_PRICE_OFFER_DETAIL, getPriceOfferSaga);
  yield takeLatest(types.CREATE_PRICE_OFFER, createPriceOfferSaga);
  yield takeLatest(types.MODIFY_PRICE_OFFER, modifyPriceOfferSaga);
  yield takeLatest(types.UPDATE_PRICE_OFFER_STATUS, updatePriceOfferStatusSaga);
}
