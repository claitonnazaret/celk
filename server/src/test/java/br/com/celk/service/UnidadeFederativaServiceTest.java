package br.com.celk.service;

import br.com.celk.domain.UnidadeFederativa;
import br.com.celk.repository.UnidadeFederativaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UnidadeFederativaServiceTest {

    @Mock
    private UnidadeFederativaRepository repository;

    @InjectMocks
    private UnidadeFederativaService service;

    private UnidadeFederativa getModel() {
        UnidadeFederativa unidadeFederativa = new UnidadeFederativa();
        unidadeFederativa.setId(1L);
        unidadeFederativa.setNome("São Paulo");
        unidadeFederativa.setSigla("SP");
        unidadeFederativa.setDataCadastro(LocalDateTime.now());
        return unidadeFederativa;
    }

    @Test
    void findById() {
        final Long id = 1L;
        final UnidadeFederativa uf = getModel();

        given(repository.findById(id)).willReturn(Optional.of(uf));

        final UnidadeFederativa expected = service.findById(id);

        assertThat(expected).isNotNull();
    }

    @Test
    void save() {
        UnidadeFederativa unidadeFederativa = getModel();

        when(repository.save(unidadeFederativa)).thenReturn(unidadeFederativa);

        UnidadeFederativa uf = service.save(unidadeFederativa);

        assertThat(uf.getNome()).isEqualTo(unidadeFederativa.getNome());
    }
}