this.addEventListener('install',function(event){
  event.waitUntil(
    caches.open('mycache')
    .then(function(ca){
      ca.addAll([

      ])
    } )
  )
})

this.addEventListener('fetch',function(event){
  event.respondWith(
    caches.open('mycache')
    .then(function(cache){
      return cache.match(event.request)
      .then(function(res){
        return res || fetch(event.request)
        .then(function(res){
          cache.put(event.request,res.clone());
          return res;
        })
      })
    })
  )
})
