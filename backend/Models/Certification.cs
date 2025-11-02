namespace CareerHubApi.Models;

public class Certification
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Issuer  { get; set; } = string.Empty;
    public string? Description  { get; set; } = string.Empty;

    private DateTime _dateIssued ;
    public DateTime DateIssued
    {
        get => _dateIssued;
        set => _dateIssued = DateTime.SpecifyKind(value, DateTimeKind.Utc);
    }

    private DateTime _expirationDate;
    public DateTime ExpirationDate
    {
        get => _expirationDate;
        set => _expirationDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
    }
}