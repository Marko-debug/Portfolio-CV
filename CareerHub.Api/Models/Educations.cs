namespace CareerHubApi.Models;

public class Education
{
    public int Id { get; set; }
    public string Institution { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string Field { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;


    private DateTime _startDate;
    public DateTime StartDate
    {
        get => _startDate;
        set => _startDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
    }

    private DateTime? _endDate;
    public DateTime? EndDate
    {
        get => _endDate;
        set => _endDate = value.HasValue ? DateTime.SpecifyKind(value.Value, DateTimeKind.Utc) : null;
    }
}
