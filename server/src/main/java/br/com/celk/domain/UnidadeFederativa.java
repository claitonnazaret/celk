package br.com.celk.domain;

import br.com.celk.converters.LocalDateTimeConverter;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
public class UnidadeFederativa implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String sigla;
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime dataCadastro = LocalDateTime.now();
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime dataAtualizacao = LocalDateTime.now();
}
