package HouseWith.hwf.Exceptions.RequestExceptioons;

public class MemberNotFoundException extends RuntimeException{
    public MemberNotFoundException(String message){
        super(message);
    }
}
