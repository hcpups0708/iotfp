iotfp
=====

4 data now served:

temperature: 
to read: 
	GET http://domain/t
to write:	
	POST http://domain/t/{value}

pressure:
to read: 
	GET http://domain/p
to write:	
	POST http://domain/p/{value}

humidility:
to read: 
	GET http://domain/h
to write:	
	POST http://domain/h/{value}

radar:
to read All: 
	GET http://domain/r
to read one:
	GET http://domain/r/{index}
to write:	
	POST http://domain/r/{index}/{value}
