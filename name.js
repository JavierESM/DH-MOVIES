
const http = require('http');
const fs = require('fs');
const movies = require("./movies")
const theaters = require("./theaters")
const faqs = require("./faqs");
const { title } = require('process');
//Cartelera 
let totalEnCartelera = movies.length;
let listadoCartelera = movies.map(f => [
	`</br> <u> ${f.title} </u> </br> ${f.overview} </br>`
	])
let filtro = movies.filter(f => {
	return f.vote_average > 7 
   })
let listadoMasVotadas = filtro.map(f => [
	`</br> <u> ${f.title} </u> </br> ${f.overview} </br> ${f.vote_average} </br>`
	])
let totalMasVotadas = filtro.length
let totalSucursales = theaters.length
let listadoSucursales = theaters.map(f =>[
	`</br> <u> ${f.name} </u> </br> ${f.address} </br> ${f.description} </br>`
])
let totalFaqs = faqs.length
let listadoFaqs = faqs.map(f =>[
	`</br> <u> ${f.faq_title} </u> </br> ${f.faq_answer} </br>`
])
// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/':

			let content = `<u> Bienvenidos a DH Movies el mejor sitio para encontrar las mejores
			películas, incluso mucho mejor que Netflix, Cuevana y PopCorn. </u> </br>
			
			</br> Películas en cartelera: ${totalEnCartelera} </br>
			
			</br> Recordá que podés visitar las secciones: </br>
			</br> i. <a href= "/en-cartelera">En cartelera </a> </br>
			</br> ii. <a href= "/mas-votadas">Mas votadas </a> </br>
			</br> iii. <a href= "/sucursales">Sucursales </a> </br>
			</br> iv. <a href= "/contacto">Contacto </a> </br>
			</br> v. <a href= "/preguntas-frecuentes">Preguntas frecuentes </a> </br>`
			res.end(content);
			break;
		// En cartelera
		case '/en-cartelera':

			let enCartelera = `En cartelera 
			</br> Películas en cartelera: ${totalEnCartelera} </br>
			</br> Nuestras películas: ${listadoCartelera} </br>`
			res.end(enCartelera);
			break;
		case '/mas-votadas':
		    let contentMas = `<u> Mas votadas </u> </br>
			Total de peliculas: ${totalMasVotadas}
            ${listadoMasVotadas}
			`
			res.end(contentMas);
			break;
		case '/sucursales':
		    let contentSuc = `<u> Nuestras salas </u> </br>
			Total de sucursales: ${totalSucursales} </br>
			Nuestras salas: ${listadoSucursales}` 
			res.end(contentSuc);
			break;
		case '/contacto':
			let contentCon = `<u> Contáctanos </u> </br> </br>
			¿Tenés algo para contarnos? Nos encanta escuchar a nuestros
			clientes. Si deseas contactarnos podés escribirnos al siguiente email:
			dhmovies@digitalhouse.com o en las redes sociales. Envianos tu consulta,
			sugerencia o reclamo y será respondido a la brevedad posible. Recordá que
			también podes consultar la sección de Preguntas Frecuentes para obtener
			respuestas inmediatas a los problemas más comunes.
			`
			res.end(contentCon);
			break;
		case '/preguntas-frecuentes':
			let contentFaqs = `<u> Preguntas frecuentes </u> </br>
			Total de preguntas: ${totalFaqs} </br>
			FAQS: ${listadoFaqs}
			`
			res.end(contentFaqs);
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));