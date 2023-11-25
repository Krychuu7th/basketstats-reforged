package reforged.marcin.krysiak.basketstats.utils;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class ReflectionUtils {

    public static List<Object> getAllFieldValues(Class<?> clazz) {
        List<Object> fieldValues = new ArrayList<>();
        Field[] fields = clazz.getDeclaredFields();
        try {
            for (Field field : fields) {
                field.setAccessible(true);
                fieldValues.add(field.get(null));
            }
        } catch (IllegalAccessException e) {
            log.error("Failed to read class field values!");
            throw new RuntimeException(e);
        }
        return fieldValues;
    }
}
