import { action, observable, has } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)




interface IStoreBucket {
  clazz: any,
  instance?: any,
  name?: string,
  initialData?: any
}

let storeList: IStoreBucket[] = [];

const toCamelCase = function (str) {
  return str
    .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
    .replace(/\s/g, '')
    .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
}

const toStoreMap = () => {
  let object = {}
  storeList.forEach((store) => {
    if (store.instance) {
      object[store.name] = store.instance
    }
  })

  return object
}

const hasStore = (_store: { new(...args: any[]) }) => {
  return !!storeList.find((store: IStoreBucket) => {
    return store.clazz.name === _store.name;
  })
}

export function stackStore(_store: { new(...args: any[]) }, initialData = {}) {
  if (!hasStore(_store)) {
    storeList.push({
      clazz: _store,
      instance: null,
      name: null,
      initialData
    })
  }
}

export function genereateStores(stores: { new(...args: any[]) }[]) {
  stores.forEach(store => {
    stackStore(store)
  })
  initialInstance();
}

export function initialInstance() {
  storeList.forEach((bucket: IStoreBucket) => {
    let constructor = bucket.clazz;
    let instance = bucket.instance;
    if (!instance) {
      bucket.instance = new constructor(true, bucket.initialData);
      bucket.name = toCamelCase(bucket.instance.constructor.name)
    }
  })
}


export function getStoreList() {
  return storeList;
}

export function setStoreList(_storeList) {
  storeList = _storeList;
}

export function getStoreStackMap() {
  return toStoreMap();
}