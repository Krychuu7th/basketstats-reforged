package reforged.marcin.krysiak.basketstats.mapper;

import java.util.List;

public interface CommonMapper<T, TDto> {
    T toEntity(TDto dto);
    TDto toDto(T entity);
    List<T> toEntityList(List<TDto> dtoList);
    List<TDto> toDtoList(List<T> entityList);
}
