import { Core as YubinBangoCore } from 'yubinbango-core2'

export async function fetchAddress(postalCode) {
    return new Promise((res, e) => {
        new YubinBangoCore(postalCode, (addr)=>{
            if(addr.region.length>0){
                res(addr.region + addr.locality + addr.street)
            }else{
                e()
            }
        })
    })
}

