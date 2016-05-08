export default function mixinClass(baseClass, target){
    const targetObj = (typeof(target) === "function")
                      ? target.prototype
                      : target;

    for(const key of Reflect.ownKeys(targetObj)){
        // コンストラクタは(相手にするのが面倒くさすぎるので)無視する
        if(key === "constructor") continue;

        const descriptor = Object.getOwnPropertyDescriptor(targetObj, key);

        descriptor.configurable = true;
        descriptor.enumerable   = false;
        if(descriptor.hasOwnProperty("writable")){
            descriptor.writable = true;
        }

        Object.defineProperty(baseClass.prototype, key, descriptor);
    }
}
