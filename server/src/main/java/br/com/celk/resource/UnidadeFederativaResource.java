package br.com.celk.resource;

import br.com.celk.domain.UnidadeFederativa;
import br.com.celk.service.UnidadeFederativaService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/uf")
public class UnidadeFederativaResource {

    private final UnidadeFederativaService service;

    public UnidadeFederativaResource(UnidadeFederativaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<UnidadeFederativa>> listAll(@RequestParam(value = "search") String search, Pageable pageable) {
        if(StringUtils.isNotBlank(search)) {
            return ResponseEntity.ok(service.listAllByFiltro(search, pageable));
        }
        return ResponseEntity.ok(service.listAll(pageable));
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestBody UnidadeFederativa unidadeFederativa) {
        try {
            UnidadeFederativa uf = service.save(unidadeFederativa);
            return ResponseEntity.ok(uf);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(e.getMessage());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
