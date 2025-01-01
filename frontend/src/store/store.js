import { makeAutoObservable } from "mobx"


function saveToSession(key, jsonObject) {

  if (typeof jsonObject === 'object' && jsonObject !== null) {
    
    sessionStorage.setItem(key, JSON.stringify(jsonObject))
  } else {
    console.error("Przekazany obiekt nie jest poprawnym obiektem JSON")
  }
}


function getFromSession(key) {
 
  const storedData = sessionStorage.getItem(key)

  
  if (storedData) {
    try {
      return JSON.parse(storedData)
    } catch (error) {
      console.error("Błąd parsowania JSON:", error)
      return null
    }
  } else {
    return null
  }
}

const dockerStore = makeAutoObservable({
  containers: [],
  images: [],
  networks: [],
  volumes: [],
  info: [],
  
  
  saveContainers(cnt) {
    if (!cnt) return
    this.containers = cnt
    saveToSession('containers', this.containers)
  },
  
  
  getContainers() {
    return this.containers || getFromSession('containers') || []
  },

  
  saveImages(cnt) {
    if (!cnt) return
    this.images = cnt
    saveToSession('images', this.images)
  },

  
  getImages() {
    return this.images || getFromSession('images') || []
  },

  saveNetworks(cnt) {
    if (!cnt) return
    this.networks = cnt
    saveToSession('networks', this.networks)
  },

  
  getNetworks() {
    return this.networks || getFromSession('networks') || []
  },
  saveVolumes(cnt) {
    if (!cnt) return
    this.volumes = cnt
    saveToSession('volumes', this.volumes)
  },

  
  getVolumes() {
    return this.volumes || getFromSession('volumes') || []
  },
  saveInfo(cnt) {
    if (!cnt) return
    this.info = cnt
    saveToSession('info', this.info)
  },
  getInfo(id) {
    if (!id) return this.info
    if (this.info && this.info.length > 0 && this.info.Id === id) {
      return this.info
    }
    
    const info = getFromSession('info')
    if (info && info.Id === id) {
      return info
    }
    
    return []
  },
  setInfoStatus(status) {
    this.info= {...this.info, Status: status}
    saveToSession('info', this.info)
  },
  setContainersStatus(id,status) {
    const cnt = this.containers.find(c => c.id === id)
    const cnt2 = {...cnt, status: status}
    const co= this.containers.filter(c => c.id !== id)
    this.containers= [...co, cnt2]
    saveToSession('containers', this.containers)
  },
  removeContainer(id) {
    this.containers = this.containers.filter(c => c.id !== id)
    saveToSession('containers', this.containers)
  }
  
})

export default dockerStore
